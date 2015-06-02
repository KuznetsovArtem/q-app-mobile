'use strict';

/**
 * @ngdoc service
 * @name login.Services.AuthService
 * @description AuthService Service
 */
angular
    .module('login')
    .service('AuthService', [
        '$q',
        'UserModel',
        function($q, UserModel) {

            return {
                isLoggedIn : function() {
                    var deferred = $q.defer();
                    console.log('check if user logged in');
                    UserModel.getUser(1).then(function(user) {
                        deferred.resolve(user && user.token);
                    });

                    return deferred.promise;
                }
            }

        }
    ]);
