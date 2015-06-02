'use strict';

/**
 * @ngdoc object
 * @name profile.Controllers.ProfileController
 * @description ProfileController
 * @requires ng.$scope
*/
angular
    .module('profile')
    .controller('ProfileController', [
        '$scope',
        'localizationService',
        '$modal',
        'UserModel',
        function($scope, localizationService, $modal, UserModel) {

            $scope.languages = [{
                name: 'English',
                id: 1
            },{
                name: 'English',
                id: 1
            },{
                name: 'English',
                id: 1
            }];

            $scope.showProfile = function() {
                var modalProfile = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/profile.html',
                    controller: 'RegisterController',
                    resolve : {
                        user : function() {
                            return UserModel.getUser(1);
                        }
                    }
                });

                modalProfile.result.then(function (data) {
                    UserModel.save(data).then(function(data) {
                        console.log('deferred user', data);
                    });
                }, function () {

                });
            };

            $scope.animationsEnabled = false; // TODO: move to config factory

            $scope.showAgreement = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/profile/views/agreement.html',
                    controller: 'ModalInstanceCtrl',
                    size: size
                });

                modalInstance.result.then(function (apply) {}, function () {});
            };

            $scope.showCities = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/profile/views/cities-select.html',
                    controller: function($scope, $modalInstance) {
                        $scope.cities = [{
                            name: 'Kiev',
                            id : 1
                        },{
                            name: 'Kharkiv',
                            id : 1
                        },{
                            name: 'Dnipropetrovsk',
                            id : 1
                        },{
                            name: 'Odessa',
                            id : 1
                        },{
                            name: 'Zaporizhia',
                            id : 1
                        },{
                            name: 'Lviv',
                            id : 1
                        },{
                            name: 'Kryvyi Rih',
                            id : 1
                        },{
                            name: 'Mykolaiv',
                            id : 1
                        },{
                            name: 'Mariupol',
                            id : 1
                        }];

                        $scope.ok = function () {
                            $modalInstance.close('TODO:DATA');
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (apply) {}, function () {});
            };

        }
    ]);

