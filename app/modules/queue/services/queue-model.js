'use strict';

/**
 * @ngdoc service
 * @name queue.Services.QueueModel
 * @description QueueModel Service
 */
angular
    .module('queue')
    .factory('uiErrors', [
        '$injector',
        function($injector) {

        var uiErrorCodes = ['LOGIN_FAILED'];

        return {
            show: function(rejection) {
                var modal = $injector.get('$modal');
                modal.open({
                    animation: false,
                    templateUrl: 'modules/core/views/error-modal.html',
                    controller: function($scope, $modalInstance) {
                        if(rejection.data
                            &&rejection.data.error
                            &&rejection.data.error.code) {

                                if(uiErrorCodes.indexOf(rejection.data.error.code) >= 0) {
                                    $scope.msg = 'app.error.' + rejection.data.error.code;
                                }
                        }

                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                    }
                });
            }
        }
    }])
    .factory('loadingLayerInterceptor', [
        '$rootScope',
        'uiErrors',
        function($rootScope, uiErrors) {
            return {
                request: function(config) {
                    if(config.url.match(/88.198/)) {
                        $rootScope.$broadcast('loading.show');
                    }
                    return config;
                },

                response: function(response) {
                    if(response.config&&response.config.url&&response.config.url.match(/88.198/)) {
                        $rootScope.$broadcast('loading.hide');
                    }
                    return response;
                },
                requestError: function(rejection) {
                    return rejection;
                },
                responseError: function(rejection) {

                    if(rejection.config&&rejection.config.url&&rejection.config.url.match(/88.198/)) {
                        uiErrors.show(rejection);
                    }

                    $rootScope.$broadcast('loading.hide');
                    return rejection;
                }
            };
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('loadingLayerInterceptor');
    }])
    .factory('apiConfig', function() {
        var apiPort = 3001;
        if(window.DEV_MODE) {
            apiPort = 3000;
        }
        return {
            host    : ['http://88.198.194.40', apiPort].join(':') ,
            // register
            orgUrl  : '/api/organizations',
            ctrsUrl : '/api/organizations/:orgId',
            srvsUrl : '/api/organizations/:orgId/services',
            timeUrl : '/api/organizations/:orgId/services/:srvId/:date',
            // edit/list
            qList   : '/api/services/get/:userId',
            delQUrl : '/api/services/del?userId=:userId&srvId=:srvId'
        }
    })
    .service('QueueModel', [
        '$http',
        '$q',
        '$filter',
        'UserModel',
        'localStorageService',
        'apiConfig',
        function($http, $q, $filter, UserModel, Storage, api) {
            var MODEL_NAME = 'queuesModel';

            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            function prepDateTime(date, time) {
                // 'yyyy-MM-dd HH:mm:ss Z'
                return $filter('date')(date, 'yyyy-MM-dd') + ' ' + $filter('date')(time, 'HH:mm', '-0000');
            }

            return {
                add: function(queue) {

                    var deferred = $q.defer();

                    var host = 'http://88.198.194.40:3001',
                        orgUrl = '/api/organizations/registerService';

                    UserModel.getUser(1).then(function(user) {
                        var data = {
                            orgId : queue.organization.id,
                            orgName : queue.organization.name,
                            ctrId: queue.center.id,
                            ctrName: queue.center.name,
                            srvId : queue.service.id,
                            srvName : queue.service.name,
                            dateTime : prepDateTime(queue.date, queue.time),
                            userId : user.id
                        };

                        $http.post(host + orgUrl, data).
                            success(function(qu) {
                                deferred.resolve(qu);
                            }).
                            error(function(rejection) {
                                deferred.reject(rejection);
                            });
                    });

                    return deferred.promise;
                },
                get: function() {
                    var deferred = $q.defer();

                    var modelData = Storage.get(MODEL_NAME);
                    if(modelData) {
                        deferred.resolve(
                            angular.fromJson(modelData)
                        );
                        return deferred.promise
                    }

                    function parseModel(model) {

                        var parsedModel = [];
                        angular.forEach(model, function(raw) {
                            if(!raw.id) {
                                return;
                            }
                            this.push({
                                id: raw.id,
                                organization: {
                                    name: raw.orgName,
                                    id: raw.orgId
                                },
                                service : {
                                    name:raw.srvName,
                                    id: raw.srvId
                                },
                                center: {
                                    name: raw.ctrName,
                                    id : raw.ctrId
                                },
                                receipt : {
                                    num : raw.receiptnum,
                                    letter: raw.receiptletter
                                },
                                date: raw.dateTime,
                                time: raw.dateTime,
                                rate: 5,
                                isArchive : false
                            });
                        }, parsedModel);

                        return parsedModel;
                    }

                    UserModel.getUser(1).then(function(user) {
                        $http.get(api.host + api.qList.replace(':userId', user.id)).
                            success(function(qu) {
                                deferred.resolve(
                                    storageSave(parseModel(qu))
                                );
                            }).
                            error(function(rejection) {
                                deferred.reject(rejection);
                            });
                    });

                    return deferred.promise
                },
                saveAll: function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                },
                save : function(queue, isNew) {
                    var deferred = $q.defer();
                    var modelData = angular.fromJson(Storage.get(MODEL_NAME));
                    if(!isNew) {
                        var newModel = [];
                        angular.forEach(modelData, function(q) {
                            if(q.id === queue.id) {
                                newModel.push(queue);
                            } else{
                                newModel.push(q)
                            }
                        }, newModel);
                        modelData = newModel;
                    } else {
                        modelData.push(queue);
                    }
                    deferred.resolve(storageSave(modelData));

                    return deferred.promise;
                },
                del : function(id) {
                    var def = $q.defer();
                    UserModel.getUser(1).then(function(user) {
                        $http.get(api.host + api.delQUrl.replace(':userId', user.id).replace(':srvId', id)).
                            success(function(data) {
                                def.resolve(data);
                            }).
                            error(function(rejection) {
                                def.reject(rejection);
                            });
                    });
                    return def.promise;
                }
            }
        }
    ])
    .service('OrganizationsModel', [
        '$http',
        '$q',
        'apiConfig',
        function($http, $q, api) {
            return {
                get: function() {
                    var deferred = $q.defer();
                    $http.get(api.host + api.orgUrl).
                        success(function(orgs) {
                            deferred.resolve(orgs);
                        }).
                        error(function(rejection) {
                            deferred.reject(rejection);
                        });
                    return deferred.promise;
                }
            }
        }
    ])
    .service('CentersModel', [
        '$http',
        '$q',
        'apiConfig',
        function($http, $q, api) {
            function parse(data) {
                var parsedData = [];
                angular.forEach(data, function(item) {
                    this.push({
                        id : item.ServiceCenterId,
                        name: item.ServiceCenterName
                    });
                }, parsedData);

                return parsedData;
            }

            return {
                get: function(orgId) { // TODO: lang
                    var deferred = $q.defer();
                    $http.get(api.host + api.ctrsUrl.replace(':orgId', orgId)).
                        success(function(srvs) {
                            deferred.resolve(parse(srvs));
                        }).
                        error(function(rejection) {
                            deferred.reject(rejection);
                        });
                    return deferred.promise;
                }
            }
        }
    ])
    .service('ServicesModel', [
        '$http',
        '$q',
        'apiConfig',
        function($http, $q, api) {

            function parse(data) {
                var parsedData = [];
                angular.forEach(data, function(item) {
                    this.push({
                        id : item.ServiceId,
                        name: item.Description
                    });
                }, parsedData);

                return parsedData;
            }

            return {
                get: function(orgId, ctrId) { // TODO: lang
                    var deferred = $q.defer();
                    $http.get(api.host + api.srvsUrl.replace(':orgId', orgId) + '?ctrId=' + ctrId).
                        success(function(srvs) {
                            deferred.resolve(parse(srvs));
                        }).
                        error(function(rejection) {
                            deferred.reject(rejection);
                        });
                    return deferred.promise;
                }
            }
        }
    ])
    .service('DateModel', [
        '$http',
        '$q',
        function($http, $q) {
            var host = 'http://88.198.194.40:3001',
                dateUrl = '/api/organizations/:orgId/services/:srvId';

            function parse(data) {
                var events = [];
                angular.forEach(data, function(item) {
                    if(item.CountJobs) {
                        this.push(               {
                            date: new Date(parseInt(item.DatePart.match(/\((.+)\)/)[1])),
                            status: 'partially'
                        });
                    }
                    if(!item.IsAllow) {
                        this.push({
                            date: new Date(parseInt(item.DatePart.match(/\((.+)\)/)[1])),
                            status: 'full'
                        });
                    }
                }, events);

                return {
                    events: events
                };
            }

            return {
                get: function(orgId, ctrId, srvId) {
                    var deferred = $q.defer();
                    $http.get(host + dateUrl.replace(':orgId', orgId).replace(':srvId', srvId) + '?ctrId=' + ctrId).
                        success(function(dates) {
                            deferred.resolve(parse(dates));
                        }).
                        error(function(rejection) {
                            deferred.reject(rejection);
                        });
                    return deferred.promise;
                }
            };
        }
    ])
    .service('TimeModel', [
        '$http',
        '$q',
        'localStorageService',
        'apiConfig',
        '$rootScope',
        function($http, $q, Storage, api, $rootScope) {

            function parseDuration(t){

                var hr = parseInt(t.match(/(\d{1,2})H/)[1]) *60*60*1000;
                var mn = t.match(/(\d{1,2})M/)&&t.match(/(\d{1,2})M/)[1];
                if(mn) {
                    hr += mn * 60 * 1000;
                }
                return hr;
            }
            function parse(data) {
                var parsedData = [];
                angular.forEach(data, function(item) {
                    this.push({
                        time    : parseDuration(item.StartTime),
                        isAllow : item.IsAllow
                    });
                }, parsedData);

                return parsedData;
            }

            return {
                get: function(orgId, ctrId, srvId, date) { // TODO: lang
                    var deferred = $q.defer();
                    $http.get(api.host + api.timeUrl.replace(':orgId', orgId).replace(':srvId', srvId).replace(':date', date) + '?ctrId=' + ctrId).
                        success(function(timeList) {
                            deferred.resolve(parse(timeList));
                        }).
                        error(function(rejection) {
                            deferred.reject(rejection);
                        });
                    return deferred.promise;
                }
            };
        }
    ]);

