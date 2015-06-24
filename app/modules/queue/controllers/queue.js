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
        '$stateParams',
        'localStorageService',
        function ($scope, l, $modal, $filter, $stateParams, Storage) {
            var queues = angular.fromJson(Storage.get('queuesModel')); // TODO: model
            $scope.queue = $filter('getById')(queues, $stateParams.id);

            $scope.editQueue = true;

            $scope.fake = function() {
                $modal.open({
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
            }
        }
    ])
    .controller('QueueController', [
        '$scope',
        'localizationService',
        '$modal',
        'timeList',
        function($scope, localizationService, $modal, timeList) {

            $scope.date = '';
            $scope.time = '';


            $scope.animationsEnabled = false; // TODO: move to config factory
            $scope.getDate = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/date-select.html',
                    controller: function($scope, $modalInstance) {

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
                    },
                    size: size
                });

                modalInstance.result.then(function (dt) {
                    $scope.date = dt;
                }, function () {});
            };

            $scope.getTime = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/queue/views/time-select.html',
                    controller: function($scope, $modalInstance) {
                        $scope.selectedTime = '--:--';
                        $scope.timeList = timeList.get();
                        $scope.setTime = function(time) {
                            $scope.selectedTime = time + ':00'; // TODO
                        };
                        $scope.ok = function () {
                            $modalInstance.close($scope.selectedTime);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                        //angular.extend(this, $controller('ModalInstanceCtrl', {$scope: $scope}));
                    },
                    size: size
                });

                modalInstance.result.then(function (selectedTime) {
                    $scope.time = selectedTime;
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
            }
        }
    ])
    .service('timeList', [function() {
        return {
            get : function () {
                return [9,10,11,12,13,14,15,16,17,18]
            }
        }
    }]);
