'use strict';

/**
 * @ngdoc object
 * @name queue.Controllers.QueueController
 * @description QueueController
 * @requires ng.$scope
*/
angular
    .module('queue')
    .controller('QueueEditController', [
        '$scope',
        'localizationService',
        '$modal',
        '$filter',
        '$state',
        '$stateParams',
        'localStorageService',
        '$controller',
        'QueueModel',
        function ($scope, l, $modal, $filter, $state, $stateParams, Storage, $controller, QueueModel) {
            var queues = angular.fromJson(Storage.get('queuesModel')); // TODO: model
            var queue = $scope.queue = $filter('getById')(queues, $stateParams.id);

            $scope.editQueue = true;
            $scope.toggleEdit = function() {
                $scope.editQueue = !$scope.editQueue;
            };

            $scope.estimateTime = ~~((new Date($scope.queue.date) - new Date()) / (1000*60*60));

            // Date modal
            $scope.getDate = function (size) {
                $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/date-select.html',
                    controller: 'DateController',
                    size: size
                }).result.then(function (dt) {
                    $scope.queue.date = dt;
                    QueueModel.save($scope.queue);
                }, function () {});
            };
            // Time modal
            $scope.getTime = function (size) {
                $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/time-select.html',
                    resolve: {
                        timeList : ['timeList', function(timeList) {
                            return timeList.get();
                        }]
                    },
                    controller: 'TimeController',
                    size: size
                }).result.then(function (selectedTime) {
                        $scope.queue.time = selectedTime;
                        QueueModel.save($scope.queue);
                    }, function () {});
            };

            // Organization modal
            $scope.getOrganization = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/organization-select.html',
                    resolve: {
                        organizations: ['OrganizationsModel', function(OrganizationsModel) {
                            return OrganizationsModel.get();
                        }],
                        selectedOrg : function(){
                            return $scope.queue.organization
                        }
                    },
                    controller: 'OrganisationController'
                }).result.then(function (org) {
                        $scope.queue.organization = org;
                        QueueModel.save($scope.queue);
                    }, function () {});
            };

            // Service modal
            $scope.getService = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/service-select.html',
                    resolve: {
                        services: ['ServicesModel', function(ServicesModel) {
                            return ServicesModel.get($scope.queue.organizationId);
                        }],
                        selectedSrvc : function(){
                            return $scope.queue.service
                        }                    },
                    controller: 'ServiceController'
                }).result.then(function (srv) {
                        $scope.queue.service = srv;
                        QueueModel.save($scope.queue);
                    }, function () {});
            };

            // Rate
            $scope.showRate = function (size) {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/rate-select.html',
                    resolve : {
                        starRate : function () {
                            return $scope.queue.rate;
                        }
                    },
                    controller: function($scope, $modalInstance, starRate) {
                        $scope.starRate = starRate;
                        $scope.select = function (rate) {
                            $modalInstance.close(rate);
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (id) {
                    $scope.queue.rate = id;
                    QueueModel.save($scope.queue);
                }, function () {});
            };

            // Delete
            $scope.deleteModal = function (size) {
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/delete-modal.html',
                    controller: function($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (id) {
                    QueueModel.del($scope.queue.id);
                    $scope.queue.isDelete = true;
                    QueueModel.save($scope.queue).then(function() {
                        $state.go('queueList');
                    });
                    //TODO: location to list, $delete BE
                    //UserModel.save(user); // TODO: save queue
                }, function () {});
            };
        }
    ])
    .controller('QueueController', [
        '$scope',
        'localizationService',
        '$modal',
        '$state',
        'QueueModel',
        function($scope, localizationService, $modal, $state, QueueModel) {

            $scope.date = '';
            $scope.time = '';
            $scope.organization = {};
            $scope.service = {};

            $scope.animationsEnabled = false; // TODO: move to config factory

            // Date modal
            $scope.getDate = function (size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/date-select.html',
                    controller: 'DateController',
                    resolve: {
                        dateModel: ['DateModel', function(DateModel) {
                            return DateModel.get($scope.service.id);
                        }]
                        // TODO: selected date;
                    },
                    size: size
                });

                modalInstance.result.then(function (dt) {
                    $scope.date = dt;
                }, function () {});
            };

            // Time modal
            $scope.getTime = function (size) {
                $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/time-select.html',
                    resolve: {
                        timeList : ['timeList', function(timeList) {
                            return timeList.get();
                        }],
                        timeModel: ['TimeModel', function(TimeModel) {
                            return TimeModel.get($scope.service.id);
                        }]
                    },
                    controller: 'TimeController',
                    size: size
                }).result.then(function (selectedTime) {
                    $scope.time = selectedTime;
                }, function () {});
            };

            // Organization modal
            $scope.getOrganization = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/organization-select.html',
                    resolve: {
                        organizations: ['OrganizationsModel', function(OrganizationsModel) {
                            return OrganizationsModel.get();
                        }],
                        selectedOrg : function(){
                            return $scope.organization;
                        }
                    },
                    controller: 'OrganisationController'
                }).result.then(function (org) {
                    $scope.organization = org;
                    $scope.clear(1);
                }, function () {});
            };

            // Service modal
            $scope.getService = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/service-select.html',
                    resolve: {
                        services: ['ServicesModel', function(ServicesModel) {
                            return ServicesModel.get($scope.organization.id);
                        }],
                        selectedSrvc : function(){
                            return $scope.service;
                        }
                    },
                    controller: 'ServiceController'
                }).result.then(function (srv) {
                    $scope.service = srv;
                    $scope.clear(2);
                }, function () {});
            };

            $scope.fake = function() {
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/fake-modal.html',
                    controller: function($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close($scope.selectedTime);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                });
            };

            $scope.clear = function(type) {
                var clearFields = function(type) {
                    $scope.time = '';
                    $scope.date = '';
                    if(type <= 1) {
                        $scope.service = {};
                    }
                    if(type === -1) {
                        $scope.organization = {};
                        $scope.service = {};
                    }
                };

                if(type === -1) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'modules/queue/views/delete-modal.html',
                        controller: function($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close();
                            };
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    }).result.then(function () {
                        clearFields(type);
                    }, function () {});
                } else {
                    clearFields(type);
                }

            };

            $scope.addQueue = function() {
                var model = {
                    organization: $scope.organization,
                    service :  $scope.service,
                    date: $scope.date,
                    time: $scope.time,
                    rate: '',
                    isArchive: false
                };

                QueueModel.add(model);
                QueueModel.save(model).then(function() {
                    $state.go('queueList');
                });
            }
        }
    ])
    .controller('DateController', function($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close($scope.dt);
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function () {
            $scope.dt = null;
        };
        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];
        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        };
    })
    .controller('TimeController', function($scope, $modalInstance, timeList) {
        $scope.showTime = '--:--';
        $scope.selectedTime = '';
        $scope.timeList = timeList;
        $scope.setTime = function(time) {
            $scope.selectedTime = time;
            $scope.showTime = time + ':00';
        };
        $scope.ok = function () {
            $modalInstance.close($scope.selectedTime + ':00');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        //angular.extend(this, $controller('ModalInstanceCtrl', {$scope: $scope}));
    })
    .controller('OrganisationController', function($scope, $modalInstance, organizations, selectedOrg) {
        $scope.organizations = organizations;
        $scope.selectedOrg = selectedOrg||'';
        $scope.selectOrg = function(org) {
            $scope.selectedOrg = org;
        };
        $scope.ok = function () {
            $modalInstance.close($scope.selectedOrg);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ServiceController', function($scope, $modalInstance, services, selectedSrvc) {
        $scope.services = services;
        $scope.selectedSrvc = selectedSrvc||'';
        $scope.selectSrvc = function(srvc) {
            $scope.selectedSrvc = srvc;
        };
        $scope.ok = function () {
            $modalInstance.close($scope.selectedSrvc);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .service('timeList', [function() {
        return {
            get : function () {
                return [9,10,11,12,13,14,15,16,17,18]
            }
        }
    }])
    .filter('estimate', function () {
        return function (number) {
            number = String(number);
            var days = ~~(number / 24);
            var hours= number%24;
            return days + 'д ' + hours + 'ч';
        };
    });

