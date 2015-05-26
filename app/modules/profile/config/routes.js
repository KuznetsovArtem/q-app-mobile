'use strict';

/**
* @ngdoc object
* @name profile.config
* @requires ng.$stateProvider
* @description Defines the routes and other config within the profile module
*/
angular
    .module('profile')
    .config(['$stateProvider',
        function($stateProvider) {
            /**
             * @ngdoc event
             * @name profile.config.route
             * @eventOf profile.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'profile'`, route to profile
             *
            */
            $stateProvider
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'modules/profile/views/profile.html',
                    controller: 'ProfileController'
                });
        }
    ]);
