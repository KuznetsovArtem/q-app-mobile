'use strict';

/**
 * @ngdoc service
 * @name profile.Services.UserModel
 * @description UserModel Service
 */
angular
    .module('profile')
    .service('UserModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {

            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers';

            var userSchema = { // test data; TOTO: rm
                "phone": "",
                "email": "test@.com",
                "login": "",
                "password": "",
                "firstname": "",
                "lastname": "",
                "birthdate": "",
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
            };

            return {
                getUser: function(userId) {
                    var deferred = $q.defer();

                    if(userId) {
//                        TODO: get from cache
//                            TODO: api get
                        var userModel = Storage.get('userModel');
                        deferred.resolve(
                            angular.fromJson(userModel)
                        );
                    } else {
                        // default model
                        deferred.resolve(userSchema);
                    }

                    return deferred.promise
                },
                save : function(user) {
                    var userModel,
                        deferred = $q.defer();

                    // TODO: token & id in ajax success
                    user.token = '123';
                    user.id = 1;
                    userModel = angular.toJson(user);

                    Storage.set('userModel', userModel);

                    $http.post(host + customersUrl, user).
                        success(function(data, status, headers, config) {
                            console.log('http s', user, data, status, headers, config);
                            deferred.resolve(user);
                        }).
                        error(function(data, status, headers, config) {
                            console.log('http e', user, data);
                            deferred.resolve(user);
                            //deferred.dismiss(user);
                        });

                    return deferred.promise;
                }
            }
        }
    ]);
