'use strict';

/**
 * @ngdoc object
 * @name profile.Controllers.ProfileController
 * @description ProfileController
 * @requires ng.$scope
*/
angular
    .module('profile')
    .controller('SettingsController', [
        '$scope',
        '$filter',
        'localizationService',
        '$modal',
        'UserModel',
        'user',
        function($scope, $filter, localizationService, $modal, UserModel, user) {

            var languagesModel = [{
                name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
                id: 1
            },{
                name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
                id: 2
            },{
                name: 'English',
                id: 3
            }];

            var citiesModel = {
                1 : [{ // ru
                    name: '\u041A\u0438\u0435\u0432',
                    id : 1
                },{
                    name: '\u0425\u0430\u0440\u044C\u043A\u043E\u0432',
                    id : 2
                }],
                2 : [{ // ua
                    name: 'Kiev',
                    id : 1
                },{
                    name: 'Kharkiv',
                    id : 2
                }],
                3 : [{ // en
                    name: 'Kiev',
                    id : 1
                },{
                    name: 'Kharkiv',
                    id : 2
                }]
            };

            var CitiesModel;

            localizationService.setLanguage(user.profile.languageid);
            // tpl vars
            $scope.user = user;
            CitiesModel = citiesModel[user.profile.languageid];
            $scope.userCity = $filter('getById')(CitiesModel, user.address.cityid).name;
            $scope.userLang = $filter('getById')(languagesModel, user.profile.languageid).name;

            //var user;
            //UserModel.getUser(1).then(function(userData) {
            //    $scope.user = user = userData;
            //    $scope.userCity = $filter('getById')(CitiesModel, userData.address.cityid).name;
            //    $scope.userLang = $filter('getById')(languagesModel, userData.profile.languageid).name;
            //    CitiesModel = citiesModel[userData.profile.languageid];
            //});

            // Settings modals
            $scope.showProfile = function() {
                var modalProfile = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/profile.html',
                    controller: 'ProfileController',
                    resolve : {
                        user : function() {
                            return UserModel.getUser(1);
                        }
                    }
                });

                modalProfile.result.then(function (data) {
                    UserModel.save(data).then(function(data) {
                        //console.log('deferred user', data);
                    });
                }, function () {

                });
            };

            $scope.animationsEnabled = false; // TODO: move to config factory

            // Agreement
            $scope.showAgreement = function (size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/profile/views/agreement.html',
                    controller: 'ModalInstanceCtrl',
                    size: size
                });
                modalInstance.result.then(function (apply) {}, function () {});
            };

            // About
            $scope.showAbout = function (size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/profile/views/about.html',
                    controller: 'ModalInstanceCtrl',
                    size: size
                });
                modalInstance.result.then(function (apply) {}, function () {});
            };

            // Lang
            $scope.showLangs = function (size) {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/lang-select.html',
                    resolve: {
                        user : function() {
                            return UserModel.getUser(1);
                        }
                    },
                    controller: function($scope, $modalInstance, user) {
                        $scope.languages = languagesModel;
                        $scope.selectedLang = user.profile.languageid;

                        $scope.selectLang = function(id) {
                            $scope.selectedLang = id;
                        };

                        $scope.ok = function () {
                            $modalInstance.close($scope.selectedLang);
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (id) {
                    // TODO: update user model -> save;
                    user.profile.languageid = id;
                    UserModel.save(user);
                    localizationService.setLanguage(id);
                    $scope.userLang = $filter('getById')(languagesModel, id).name;
                }, function () {});
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
    .controller('ProfileController', [
        '$scope',
        '$modalInstance',
        'user',
        '$modal',
        'UserModel',
        function($scope, $modalInstance, user, $modal, UserModel) {
            $scope.user = user;

            $scope.profilePage = true;
            $scope.haveCard = user.paytools[0].paytoolid;

            $scope.ok = function () {
                $modalInstance.close(
                    $scope.user
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

            // Cards
            $scope.editCard = function (size) {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modules/profile/views/card-modal.html',
                    resolve: {
                        card : function() {
                            return user.paytools[0];
                        }
                    },
                    controller: function($scope, $modalInstance, card) {
                        $scope.card = card;

                        $scope.isValid = function(){
                            return $scope.cardForm.$valid
                        };

                        $scope.ok = function () {
                            $modalInstance.close($scope.card);
                        };
                    },
                    size: size
                });

                modalInstance.result.then(function (card) {
                    $scope.user.paytools[0] = card;
                    $scope.haveCard = true;
                    UserModel.save($scope.user);
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
    })
    .filter('cardNumber', function () {
        return function (number) {
            number = String(number);
            return  number.slice(0,4) + ' ' +
                    number.slice(4,8) + ' ' +
                    number.slice(8,12) + ' ' +
                    number.slice(12);

        };
    });

