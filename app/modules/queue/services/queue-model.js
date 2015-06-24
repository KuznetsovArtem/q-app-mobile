'use strict';

/**
 * @ngdoc service
 * @name queue.Services.QueueModel
 * @description QueueModel Service
 */
angular
    .module('queue')
    .service('QueueModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {

            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers',
                MODEL_NAME = 'queuesModel';

            var modelSchema = { // test data; TOTO: rm
            };

            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            return {
                get: function(userId) {
                    var deferred = $q.defer();

                    if(userId) {
                        var modelData = Storage.get(MODEL_NAME);
                        deferred.resolve(
                            angular.fromJson(modelData)
                        );
                    } else {
                        // default model
                        deferred.resolve(modelSchema);
                    }

                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();

                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test

//                    $http.post(host + customersUrl, user).
//                        success(function(res, status, headers, config) {
//                            console.log('http success', res);
//                            deferred.resolve(storageSave(res.data));
//                        }).
//                        error(function(data, status, headers, config) {
//                            console.log('http error', user, data);
////                            deferred.resolve(user);
//                            deferred.dismiss(user);
//                        });
                    return deferred.promise;
                }
            }
        }
    ]);

