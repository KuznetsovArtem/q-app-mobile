'use strict';

/**
* @ngdoc object
* @name mail.config
* @requires ng.$stateProvider
* @description Defines the routes and other config within the mail module
*/
angular
    .module('mail')
    .config(['$httpProvider',
        function($httpProvider) {
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;
        }
    ])
    .config(['$stateProvider',
        function($stateProvider) {
            /**
             * @ngdoc event
             * @name mail.config.route
             * @eventOf mail.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'mail'`, route to mail
             *
            */
            $stateProvider
                .state('mail', {
                    url: '/mail',
                    templateUrl: 'modules/mail/views/mail.html',
                    controller: 'MailController',
                    resolve: {
                        'mailModel' : 'mailModel'
                    }
                });
        }
    ]);
