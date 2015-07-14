'use strict';

/**
 * @ngdoc service
 * @name queue.Services.QueueModel
 * @description QueueModel Service
 */
angular
    .module('queue')
    .service('QueueModel', [
        '$http',
        '$q',
        '$filter',
        'localStorageService',
        '$rootScope',
        function($http, $q, $filter, Storage, $rootScope) {

            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers',
                MODEL_NAME = 'queuesModel';

            var modelSchema = { // test data; TOTO: rm
            };

            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            function prepDateTime(date, time) {
                'yyyy-MM-dd HH:mm:ss Z'
                return $filter('date')(date, 'yyyy-MM-dd') + ' ' + time
            }

            return {
                add: function(queue) {
                    var deferred = $q.defer();
                    var host = 'http://109.108.87.13:8094/QueueService.svc/json_pre_reg/' +
                        'RegCustomer?organisationGuid={0B6A3E72-8604-4EB6-BD11-4C7F0A126B62}&serviceCenterId=1' +
                        '&serviceId=' + queue.service.id +
                        '&date=' + prepDateTime(queue.date, queue.time);

                        console.log('QUEUE', host, queue);
                    $rootScope.$broadcast('loading.show');
                    $http.get(host).
                        success(function(res, status, headers, config) {
                            deferred.resolve(res.d);
                            //deferred.resolve(storageSave(res.data));
                            $rootScope.$broadcast('loading.hide')
                        }).
                        error(function(data, status, headers, config) {
                            console.log('http error', data);
//                            deferred.resolve(user);
                            deferred.dismiss(user);
                        });
                    return deferred.promise;
                },
                get: function(userId) {
                    var deferred = $q.defer();

                    if(userId) {
                        var modelData = Storage.get(MODEL_NAME);
                        deferred.resolve(
                            angular.fromJson(modelData)
                        );
                    } else {
                        // default model
                        deferred.resolve(modelSchema);
                    }

                    return deferred.promise
                },
                saveAll: function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                },
                save : function(queue) {
                    var deferred = $q.defer();

                    var modelData = angular.fromJson(Storage.get(MODEL_NAME));

                    if(queue.id) {
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
                        // TODO: BE save
                        queue.id = ~~((Math.random() * 1001) + 1);
                        modelData.push(queue);
                    }
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test

//                    $http.post(host + customersUrl, user).
//                        success(function(res, status, headers, config) {
//                            console.log('http success', res);
//                            deferred.resolve(storageSave(res.data));
//                        }).
//                        error(function(data, status, headers, config) {
//                            console.log('http error', user, data);
////                            deferred.resolve(user);
//                            deferred.dismiss(user);
//                        });
                    return deferred.promise;
                },
                del : function(id) {
                    console.log('queue delete')
                }
            }
        }
    ]).service('OrganizationsModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {
            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers',
                MODEL_NAME = 'organizationsModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            return {
                get: function() { // TODO: lang
                    var deferred = $q.defer();
                    var modelData = Storage.get(MODEL_NAME);
                    deferred.resolve(
                        angular.fromJson(modelData)
                    );
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]).service('ServicesModel', [
        '$http',
        '$q',
        'localStorageService',
        '$rootScope',
        function($http, $q, Storage, $rootScope) {
            var host = 'http://109.108.87.13:8094/QueueService.svc/json_pre_reg/',
                servicesUrl = 'GetServiceList?organisationGuid={0B6A3E72-8604-4EB6-BD11-4C7F0A126B62}&serviceCenterId=1',
                MODEL_NAME = 'servicesModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

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
                get: function() { // TODO: org id
                    var deferred = $q.defer();
                    $rootScope.$broadcast('loading.show');
                    $http.get(host + servicesUrl).
                        success(function(res, status, headers, config) {
                            deferred.resolve(parse(res.d));
                            //deferred.resolve(storageSave(res.data));
                            $rootScope.$broadcast('loading.hide')
                        }).
                        error(function(data, status, headers, config) {
                            console.log('http error', data);
//                            deferred.resolve(user);
                            deferred.dismiss(user);
                        });

                    //var modelData = Storage.get(MODEL_NAME);
                    //deferred.resolve(
                    //    angular.fromJson(modelData)
                    //);
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]).service('DateModel', [
        '$http',
        '$q',
        'localStorageService',
        '$rootScope',
        function($http, $q, Storage, $rootScope) {
            var host = 'http://109.108.87.13:8094/QueueService.svc/json_pre_reg/',
                dateUrl = 'GetDayList?organisationGuid={0B6A3E72-8604-4EB6-BD11-4C7F0A126B62}&serviceCenterId=1&serviceId=2',
                MODEL_NAME = 'servicesModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            function parse(data) {
                var parsedData = [];
                angular.forEach(data, function(item) {
                    //this.push({
                    //    id : item.ServiceId,
                    //    name: item.Description
                    //});
                }, parsedData);

                return parsedData;
            }

            return {
                get: function() { // TODO: org id
                    var deferred = $q.defer();
                    $rootScope.$broadcast('loading.show');
                    $http.get(host + dateUrl).
                        success(function(res, status, headers, config) {
                            console.log('http success', res, parse(res.d));
                            deferred.resolve(parse(res.d));
                            $rootScope.$broadcast('loading.hide')
                        }).
                        error(function(data, status, headers, config) {
                            console.log('http error', data);
                            deferred.dismiss(user);
                        });
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]).service('TimeModel', [
        '$http',
        '$q',
        'localStorageService',
        '$rootScope',
        function($http, $q, Storage, $rootScope) {
            var host = 'http://109.108.87.13:8094/QueueService.svc/json_pre_reg/',
                timeUrl = 'GetTimeList?organisationGuid={0B6A3E72-8604-4EB6-BD11-4C7F0A126B62}&serviceCenterId=1&serviceId=2&date=2015-07-22',
                MODEL_NAME = 'servicesModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            function parse(data) {
                var parsedData = [];
                angular.forEach(data, function(item) {
                    this.push({
                        //id : item.ServiceId,
                        //name: item.Description
                    });
                }, parsedData);

                return parsedData;
            }

            return {
                get: function() { // TODO: org id
                    var deferred = $q.defer();
                    $rootScope.$broadcast('loading.show');
                    $http.get(host + timeUrl).
                        success(function(res, status, headers, config) {
                            console.log('http success', res, parse(res.d));
                            deferred.resolve(parse(res.d));
                            $rootScope.$broadcast('loading.hide')
                        }).
                        error(function(data, status, headers, config) {
                            deferred.dismiss(user);
                        });
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]);

