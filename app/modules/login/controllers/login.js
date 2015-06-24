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
        function($scope, $modalInstance, user) {
            $scope.user = user;

            $scope.ok = function () {
                $modalInstance.close(
                    $scope.user
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
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
        'auth',
        'DataPopulate',
        function($scope, $cordovaNetwork, localizationService, $state, $modal, $log, UserModel, auth, Populate) {

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

            // No device back button
            document.addEventListener("backbutton", function(e) {
                e.preventDefault();
                //TODO: close modal;
            } , false);

            // TODO: rm population;
            Populate.run();
            console.log('auth', auth);
            var defState = 'settings';

            $scope.login = function() {
                if(auth) { // TODO: check auth
                   $state.go(defState, {}, {reload: false});
                }
            };

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
                        console.log('reg - ok .... \nLogin...', data);
                        $state.go(defState, {}, {reload: false});
                    }, function() {
                        console.log('register - nononono')
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
            $modalInstance.close('TODO:DATA');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    ;
