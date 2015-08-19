'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HeaderController', [
        '$scope',
        '$location',
        function($scope, $location) {
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };
        }
    ])
    .controller('HomeController', ['$scope',
        '$http',
        '$cordovaVibration',
        '$cordovaNetwork',
        '$cordovaGeolocation',
        function($scope, $http, $cordovaVibration, $cordovaNetwork, $cordovaGeolocation) {
            $scope.moduleName = 'Home Module';

            // http
            $http.defaults.useXDomain = true;

            // vibro
            $scope.vibrate = function() {
                $cordovaVibration.vibrate([100, 200, 100, 500, 200, 500, 100, 200, 100, 500, 200, 500]);
            };

            // net
            $scope.networkType = null;
            $scope.connectionType = null;

            document.addEventListener("deviceready", function () {
                $scope.networkType = $cordovaNetwork.getNetwork();

                if ($cordovaNetwork.isOnline()) {
                    $scope.connectionType = 'Online';
                }
                else if ($cordovaNetwork.isOffline()) {
                    $scope.connectionType = 'Offline';
                }
                else {
                    $scope.errorMsg = 'Error getting isOffline / isOnline methods';
                }
            }, false);

            // geolocation
            $scope.getLocation = function () {
                $cordovaGeolocation
                    .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
                    .then(function (position) {
                        $scope.position = position;
                    }, function (err) {
                        $scope.errorMsg = "Error : " + err.message;
                    });
            };


        }
    ]);
