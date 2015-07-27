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

            var host = 'http://88.198.194.40:3001', //TODO: move to config;
                customersUrl = '/api/customers',
                loginUrl = '/api/customers/login';



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

            function prepUser(user) {

                user.token = 'just_registered';
                user.paytools = [{
                    "paytoolid": "",
                    "pan": "",
                    "dateexp": ""
                }];
                user.address = {
                    "cityid": 1,
                    "description": ""
                };
                user.profile = {
                    "languageid": 1
                };
                return user;
            }

            return {
                register: function(user) {
                   //var user = {
                   //     "phone": "1234567891",
                   //     "username": "1234567891",
                   //     "firstname": "FirstTest2",
                   //     "lastname": "TestF2",
                   //     "password": "",
                   //     "email": "test1@test.com"
                   // }

                    // prepare before send
                    user.username = user.phone;

                    var deferred = $q.defer();
                    $http.post(host + customersUrl, user).
                        success(function(res, status, headers, config) {
                            deferred.resolve(storageSave(prepUser(res)));
                        }).
                        error(function(data, status, headers, config) {
                            deferred.reject(user);
                        });
                    return deferred.promise;
                },
                login : function(cred) {
                    var deferred = $q.defer();
                    var self = this;

                    $http.post(host + loginUrl, cred).
                        success(function(data, status, headers, config) {
                            deferred.resolve(
                                self.getUser(data.userId, data.id)
                            );
                        }).
                        error(function(data, status, headers, config) {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                },
                getUser: function(userId, token) {
                    var deferred = $q.defer();

                    if(userId) {

                        var userModel = Storage.get('userModel');
                        if(userModel) {
                            deferred.resolve(
                                angular.fromJson(userModel)
                            );
                        } else {
                            // Get the model from api;
                            $http.get(host + customersUrl + '/' + userId + '?access_token=' + token).
                                success(function(res, status, headers, config) {
                                    deferred.resolve(storageSave(prepUser(res)));
                                }).
                                error(function(data, status, headers, config) {
                                    deferred.reject(user);
                                });

                        }

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
