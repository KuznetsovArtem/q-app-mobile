'use strict';

/**
 * @ngdoc object
 * @name mail.Controllers.MailController
 * @description MailController
 * @requires ng.$scope
*/
angular
    .module('mail')
    .factory('mailConfig', [function() {
        return {
//            apiUrl : 'https://us3.api.mailchimp.com',
            apiUrl : 'https://cors-test.appspot.com/test',
            apiKey : 'ae1941689667c5ff853bfaf4bbfbd1e2-us3',
            campaigns : {
                listUrl: '/2.0/campaigns/list'
            }
        }
    }])
    .controller('MailController', [
        '$scope',
        'mailModel',
        function($scope, mailModel) {
            console.log(mailModel);
            $scope.apiStatus = mailModel.status || 'bad'

        }
]);
