'use strict';

/**
 * @ngdoc object
 * @name login.Controllers.LoginController
 * @description LoginController
 * @requires ng.$scope
 *
 * test user:
 * 987666666
 * test@qwe.com
 * test54321 - l
 * test54321 - p
*/
angular
    .module('login')
    .controller('RegisterController', [
        '$scope',
        '$modalInstance',
        'user',
        'UserModel',
        '$modal',
        function($scope, $modalInstance, user, UserModel, $modal) {
            $scope.user = user;


            console.log("Register:", user, UserModel);
            $scope.registerPage = true;

            $scope.ok = function () {
                UserModel.register($scope.user).then(function(data) {
                    console.log("Register:OK", data);
                    $modalInstance.close(data);
                }, function() {
                    console.log('error');
                });
            };

            $scope.cancel = function () {
                $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/cansel-modal.html',
                    controller: function($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                }).result.then(function () {
                        $modalInstance.dismiss('cancel');
                }, function () {});

            };
        }
    ])
    .controller('LoginController', [
        '$scope',
        '$cordovaNetwork',
        'localizationService',
        '$state',
        '$modal',
        '$log',
        'UserModel',
        'DataPopulate',
        '$modalStack',
        function($scope, $cordovaNetwork, localizationService, $state, $modal, $log, UserModel, Populate, $modalStack) {

            // No internet
            document.addEventListener("deviceready", function () {
                $scope.networkType = $cordovaNetwork.getNetwork();

                if ($cordovaNetwork.isOnline()) {
                    // TODO: set ok if UI
                }
                else if ($cordovaNetwork.isOffline()) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'modules/core/views/no-internet-modal.html',
                        controller: function($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close();
                            };
                        }
                    });
                }
                else {
                    //TODO : error;
                    //$scope.errorMsg = 'Error getting isOffline / isOnline methods';
                }
            }, false);

            // Device back button no exit + close modals;
            document.addEventListener("backbutton", function(e) {
                $modalStack.dismissAll();
                e.preventDefault();
            } , false);


            // The APP
            var defState = 'settings';

            $scope.isValid = function() {
                return $scope.loginForm.$valid
            };

            // Login
            $scope.login = function() {

                UserModel.login({username: $scope.username, password: $scope.password}).then(function() {
                    Populate.run(); // TODO: no populate
                    $state.go(defState, {}, {reload: false});
                }, function(rejection) {
                    console.log(rejection); // TODO: show UI error;
                });

            };

            // New User
            $scope.registerUser = function() {
                var modalRegister = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/profile.html',
                    controller: 'RegisterController',
                    resolve : {
                        user : function() {
                            return UserModel.getUser();
                        }
                    }
                });

                modalRegister.result.then(function (data) {
                    UserModel.save(data).then(function(data) {
                        $state.go(defState, {}, {reload: false});
                    }, function() {
                        console.log('error');
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.animationsEnabled = false; // TODO: move to config factory
            $scope.restorePass = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/login/views/restore-pass.html',
                    controller: 'ModalInstanceCtrl',
                    size: size
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss(false);
        };
    })
    ;
