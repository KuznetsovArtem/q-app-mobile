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
        '$controller',
        'QueueModel',
        'queueListModel',
        function ($scope, l, $modal, $filter, $state, $stateParams, $controller, QueueModel, queueListModel) {

            var queue = $scope.queue = $filter('filter')(queueListModel, {id: $stateParams.id})[0];

            $scope.editQueue = true;
            $scope.toggleEdit = function() {
                $scope.editQueue = !$scope.editQueue;
            };

            $scope.estimateTime = ~~((new Date($scope.queue&&$scope.queue.date||new Date()) - new Date()) / (1000*60*60)); // TODO : rm new date

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
                            return $scope.queue.organization;
                        }
                    },
                    controller: 'OrganisationController'
                }).result.then(function (org) {
                        $scope.queue.organization = org;
                        $scope.clear(1);
                    }, function () {});
            };

            // Center modal
            $scope.getCenter = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/center-select.html',
                    resolve: {
                        centers: ['CentersModel', function(CentersModel) {
                            return CentersModel.get($scope.queue.organization.id, $scope.queue.center.id);
                        }],
                        selectedCenter : function(){
                            return $scope.queue.center;
                        }
                    },
                    controller: 'CenterController'
                }).result.then(function (ctr) {
                        $scope.queue.center = ctr;
                        $scope.clear(2);
                    }, function () {});
            };

            // Service modal
            $scope.getService = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/service-select.html',
                    resolve: {
                        services: ['ServicesModel', function(ServicesModel) {
                            return ServicesModel.get(
                                $scope.queue.organization.id,
                                $scope.queue.center.id
                            );
                        }],
                        selectedSrvc : function(){
                            return $scope.queue.service;
                        }
                    },
                    controller: 'ServiceController'
                }).result.then(function (srv) {
                        $scope.queue.service = srv;
                        $scope.clear(3);
                    }, function () {});
            };

            // Date modal
            $scope.getDate = function (size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/date-select.html',
                    controller: 'DateController',
                    resolve: {
                        dateModel: ['DateModel', function(DateModel) {
                            return DateModel.get(
                                $scope.queue.organization.id,
                                $scope.queue.center.id,
                                $scope.queue.service.id
                            );
                        }]
                    },
                    size: size
                });

                modalInstance.result.then(function (dt) {
                    $scope.queue.date = dt;
                }, function () {});
            };

            // Time modal
            $scope.getTime = function (size) {
                $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/time-select.html',
                    resolve: {
                        timeModel: ['TimeModel', function(TimeModel) {
                            return TimeModel.get(
                                $scope.queue.organization.id,
                                $scope.queue.center.id,
                                $scope.queue.service.id,
                                $filter('date')($scope.queue.date, 'yyyy-MM-dd')
                            );
                        }]
                    },
                    controller: 'TimeController',
                    size: size
                }).result.then(function (selectedTime) {
                        $scope.queue.time = selectedTime;
                    }, function () {});
            };

            // Clear user inputs
            $scope.clear = function(type) {
                var clearFields = function(type) {
                    $scope.queue.time = '';
                    $scope.queue.date = '';
                    if(type <= 2) {
                        $scope.queue.service = {};
                    }
                    if(type <= 1) {
                        $scope.queue.service = {};
                        $scope.queue.center = {};
                    }
                    if(type === -1) {
                        $scope.queue.organization = {};
                        $scope.queue.center = {};
                        $scope.queue.service = {};
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



            // Rate
            $scope.showRate = function (size) {
                $modal.open({
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
                }).result.then(function (id) {
                    $scope.queue.rate = id;
                    QueueModel.save($scope.queue);
                }, function () {});
            };

            // Delete
            $scope.deleteModal = function (size) {
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
                    },
                    size: size
                }).result.then(function (id) {
                    QueueModel.del($scope.queue.id);
                    $scope.queue.isDelete = true;
                    QueueModel.save($scope.queue).then(function() {
                        $state.go('queueList');
                    });
                }, function () {});
            };
        }
    ])
    .controller('QueueController', [
        '$scope',
        'localizationService',
        '$modal',
        '$state',
        '$filter',
        'QueueModel',
        function($scope, localizationService, $modal, $state, $filter, QueueModel) {

            $scope.date = '';
            $scope.time = '';
            $scope.organization = {};
            $scope.center = {};
            $scope.service = {};

            $scope.animationsEnabled = false; // TODO: move to config factory

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

            // Center modal
            $scope.getCenter = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/center-select.html',
                    resolve: {
                        centers: ['CentersModel', function(CentersModel) {
                            return CentersModel.get($scope.organization.id, $scope.center.id);
                        }],
                        selectedCenter : function(){
                            return $scope.center;
                        }
                    },
                    controller: 'CenterController'
                }).result.then(function (ctr) {
                        $scope.center = ctr;
                        $scope.clear(2);
                    }, function () {});
            };

            // Service modal
            $scope.getService = function() {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/queue/views/service-select.html',
                    resolve: {
                        services: ['ServicesModel', function(ServicesModel) {
                            return ServicesModel.get($scope.organization.id, $scope.center.id);
                        }],
                        selectedSrvc : function(){
                            return $scope.service;
                        }
                    },
                    controller: 'ServiceController'
                }).result.then(function (srv) {
                    $scope.service = srv;
                    $scope.clear(3);
                }, function () {});
            };

            // Date modal
            $scope.getDate = function (size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/date-select.html',
                    controller: 'DateController',
                    resolve: {
                        dateModel: ['DateModel', function(DateModel) {
                            return DateModel.get($scope.organization.id, $scope.center.id, $scope.service.id);
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
                        timeModel: ['TimeModel', function(TimeModel) {
                            return TimeModel.get(
                                $scope.organization.id,
                                $scope.center.id,
                                $scope.service.id,
                                $filter('date')($scope.date, 'yyyy-MM-dd')
                            );
                        }]
                    },
                    controller: 'TimeController',
                    size: size
                }).result.then(function (selectedTime) {
                        $scope.time = selectedTime;
                    }, function () {});
            };

            // Clear user inputs
            $scope.clear = function(type) {
                var clearFields = function(type) {
                    $scope.time = '';
                    $scope.date = '';
                    if(type <= 2) {
                        $scope.service = {};
                    }
                    if(type <= 1) {
                        $scope.service = {};
                        $scope.center = {};
                    }
                    if(type === -1) {
                        $scope.organization = {};
                        $scope.center = {};
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

            // Send to api save
            $scope.addQueue = function() {
                var model = {
                    organization: $scope.organization,
                    service :  $scope.service,
                    center: $scope.center,
                    date: $scope.date,
                    time: $scope.time,
                    rate: '',
                    isArchive: false
                };

                QueueModel.add(model).then(function(qu) {
                    console.log(model, qu);
                    model.id = qu.id;
                    //model.dateTime = qu.dateTime;
                    //model.date = qu.dateTime;
                    //model.time = qu.dateTime;
                    model.time = $filter('date')(new Date(qu.dateTime), 'HH:mm', 'UTC+0300');
                    model.receipt = { //TODO: move to model init <- psql issue;
                        letter : qu.receiptletter,
                        num    : qu.receiptnum
                    };
                    QueueModel.save(model, true).then(function() {
                        $state.go('queueList');
                    });
                });
            }
        }
    ])
    .controller('DateController', function($scope, $modalInstance, dateModel) {

        $scope.ok = function () {
            $modalInstance.close($scope.dt);
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
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

        $scope.events = dateModel.events;
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
    .controller('TimeController', function($scope, $modalInstance, timeModel) {
        $scope.showTime = '--:--';
        $scope.selectedTime = '';
        $scope.timeModel = timeModel;
        $scope.setTime = function(time) {
            $scope.selectedTime = time;
            $scope.showTime = time;
        };
        $scope.ok = function () {
            $modalInstance.close($scope.selectedTime);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
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
    .controller('CenterController', function($scope, $modalInstance, centers, selectedCenter) {
        $scope.centers = centers;
        $scope.selectedCenter = selectedCenter||'';
        $scope.selectCenter = function(ctr) {
            $scope.selectedCenter = ctr;
        };
        $scope.ok = function () {
            $modalInstance.close($scope.selectedCenter);
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
    .filter('estimate', function () {
        return function (number) {
            number = String(number);
            var days = ~~(number / 24);
            var hours= number%24;
            return days + 'д ' + hours + 'ч';
        };
    });

