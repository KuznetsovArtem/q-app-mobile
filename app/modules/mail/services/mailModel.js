/**
 * Created by askuznetsov on 4/29/2015.
 */

'use strict';

angular
    .module('mail')
    .service('mailModel', [
        '$http',
        '$q',
        'mailConfig',
        function($http, $q, config) {
            console.log('start mail model');
//            var payload = {
//                apikey : config.apiKey
//            };
            var deferred = $q.defer();
            console.log('made defer');
//            $http.post(config.apiUrl + config.campaigns.listUrl, payload).
//            deferred.notify('sending...');
            $http.post(config.apiUrl).
                success(function(data) {
                    console.log('success', data);
                    deferred.resolve(data);
                }).
                error(function(data) {
                    console.log('rejection', data);
                    deferred.reject(data);
                });

            return deferred.promise;
    }]);