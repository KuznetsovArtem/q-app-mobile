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
                "email": "",
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
//                    {
//                        "paytoolid": "",
//                        "pan": "",
//                        "dateexp": ""
//                    }
                ]
            };

            function storageSave(user) {
                Storage.set('userModel', angular.toJson(user));
                return user;
            }

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
                    var deferred = $q.defer();

                    deferred.resolve(storageSave(user)); // TODO: rm, mocked test

                    return deferred.promise;

                    $http.post(host + customersUrl, user).
                        success(function(res, status, headers, config) {
                            console.log('http success', res);
                            deferred.resolve(storageSave(res.data));
                        }).
                        error(function(data, status, headers, config) {
                            console.log('http error', user, data);
//                            deferred.resolve(user);
                            deferred.dismiss(user);
                        });
                    return deferred.promise;
                }
            }
        }
    ]);
