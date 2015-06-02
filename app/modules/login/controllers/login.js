'use strict';

/**
 * @ngdoc object
 * @name login.Controllers.LoginController
 * @description LoginController
 * @requires ng.$scope
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
                //userModel.save($scope.user);;
                $modalInstance.close(
                    angular.toJson($scope.user)
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ])
    .controller('LoginController', [
        '$scope',
        'localizationService',
        '$modal',
        '$log',
        'UserModel',
        function($scope, localizationService, $modal, $log, UserModel) {

            $scope.registerUser = function() {
                var modalRegister = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/profile.html',
                    controller: 'RegisterController',
                    resolve : {
                        user : function() {
                            return { // test data; TOTO: rm
                                "phone": "911911911",
                                "email": "test@domain.com",
                                "login": "test",
                                "password": "password",
                                "firstname": "Test",
                                "lastname": "Test1",
                                "birthdate": "01/01/1976",
                                "address": {
                                    "cityid": 1,
                                    "description": ""
                                },
                                "profile": {
                                    "languageid": 1
                                },
                                "paytools": [
                                    {
                                        "paytoolid": "",
                                        "pan": "",
                                        "dateexp": ""
                                    }
                                ]
                            }
                        }
                    }
                });

                modalRegister.result.then(function (data) {
                    UserModel.save(data).then(function(data) {
                        console.log('deferred user', data);
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
                    size: size/*,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }*/
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
