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
        function($http, $q) {

            var host = 'http://gorelics.alfa-inet.net:9000',
                customersUrl = '/api/customers';
            return {
                save : function(user) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;

                    //$http.defaults.useXDomain = true;

                    $http.post(host + customersUrl, user).
                        success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            console.log('http s', user, data, status, headers, config);
                            deferred.resolve(user);
                        }).
                        error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            console.log('http e', user, data);
                            deferred.resolve(user, status, headers, config);
                            //deferred.dismiss(user);
                        });
                    console.log('Saving user', user);

                    deferred.resolve(user);

                    return promise;
                }
            }
        }
    ]);
