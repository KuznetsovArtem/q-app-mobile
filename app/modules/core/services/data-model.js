'use strict';

/**
 * @ngdoc service
 * @name core.Services.DataModel
 * @description DataModel Service
 */

// TODO: make parent class for models
angular
    .module('core')
    .service('DataModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {

            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers';

            var userSchema = { // test data; TOTO: rm
            };

            function storageSave(user) {
                Storage.set('userModel', angular.toJson(user));
                return user;
            }

            //def
            this.a = 'default';
            var self = this;

            return {
                getUser: function(userId) {
                    var deferred = $q.defer();

                    if(userId) {
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

                    deferred.resolve(storageSave(res.data)); // TODO: rm, mocked test
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