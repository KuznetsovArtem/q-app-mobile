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
                saveAll: function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                },
                save : function(queue) {
                    var deferred = $q.defer();

                    var modelData = angular.fromJson(Storage.get(MODEL_NAME));

                    if(queue.id) {
                        var newModel = [];
                        angular.forEach(modelData, function(q) {
                            if(q.id === queue.id) {
                                newModel.push(queue);
                            } else{
                                newModel.push(q)
                            }
                        }, newModel);

                        modelData = newModel;
                    } else {
                        // TODO: BE save
                        queue.id = ~~((Math.random() * 1001) + 1);
                        modelData.push(queue);
                    }
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
                },
                del : function(id) {
                    console.log('queue delete')
                }
            }
        }
    ]).service('OrganizationsModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {
            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers',
                MODEL_NAME = 'organizationsModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            return {
                get: function() { // TODO: lang
                    var deferred = $q.defer();
                    var modelData = Storage.get(MODEL_NAME);
                    deferred.resolve(
                        angular.fromJson(modelData)
                    );
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]).service('ServicesModel', [
        '$http',
        '$q',
        'localStorageService',
        function($http, $q, Storage) {
            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers',
                MODEL_NAME = 'servicesModel';
            function storageSave(modelData) {
                Storage.set(MODEL_NAME, angular.toJson(modelData));
                return modelData;
            }

            return {
                get: function() { // TODO: org id
                    var deferred = $q.defer();
                    var modelData = Storage.get(MODEL_NAME);
                    deferred.resolve(
                        angular.fromJson(modelData)
                    );
                    return deferred.promise
                },
                save : function(modelData) {
                    var deferred = $q.defer();
                    deferred.resolve(storageSave(modelData)); // TODO: rm, mocked test
                    return deferred.promise;
                }
            }
        }
    ]);

