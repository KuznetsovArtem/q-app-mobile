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
        '$filter',
        'localizationService',
        '$modal',
        'UserModel',
        function($scope, $filter, localizationService, $modal, UserModel) {

            $scope.languages = [{
                name: 'Ukrainian',
                id: 1
            },{
                name: 'Russian',
                id: 2
            },{
                name: 'English',
                id: 3
            }];

            var CitiesModel = [{ // TODO: move to model
                name: 'Kiev',
                id : 1
            },{
                name: 'Kharkiv',
                id : 2
            },{
                name: 'Dnipropetrovsk',
                id : 3
            },{
                name: 'Odessa',
                id : 4
            },{
                name: 'Zaporizhia',
                id : 5
            },{
                name: 'Lviv',
                id : 6
            },{
                name: 'Kryvyi Rih',
                id : 7
            },{
                name: 'Mykolaiv',
                id : 8
            },{
                name: 'Mariupol',
                id : 9
            }];

            // tpl vars
            var user;
            UserModel.getUser(1).then(function(userData) {
                $scope.user = user = userData;
                $scope.userCity = $filter('getById')(CitiesModel, userData.address.cityid).name;
                console.log(userData);
            });



            // Settings modals
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
                    resolve: {
                        user : function() {
                            return UserModel.getUser(1);
                        }
                    },
                    controller: function($scope, $modalInstance, user) {

                        $scope.cities = CitiesModel;
                        $scope.selectedCity = user.address.cityid;

                        $scope.selectCity = function(id) {
                            $scope.selectedCity = id;
                        };

                        $scope.ok = function () {
                            $modalInstance.close($scope.selectedCity);
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (cityId) {
                    // TODO: update user model -> save;
                    user.address.cityid = cityId;
                    UserModel.save(user);
                    $scope.userCity = $filter('getById')(CitiesModel, $scope.user.address.cityid).name;
                }, function () {});
            };

        }
    ])
    .filter('getById', function() {
        return function(input, id) {
            var i=0, len=input.length;
            for (; i<len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    });

