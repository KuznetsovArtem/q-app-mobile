'use strict';

/**
* @ngdoc object
* @name login.config
* @requires ng.$stateProvider
* @description Defines the routes and other config within the login module
*/
angular
    .module('login')
    .config(['$stateProvider',
        function($stateProvider) {
            /**
             * @ngdoc event
             * @name login.config.route
             * @eventOf login.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'login'`, route to login
             *
            */
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/login/views/login.html',
                    controller: 'LoginController'
                });
        }
    ]);
