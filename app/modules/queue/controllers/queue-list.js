'use strict';

/**
 * @ngdoc object
 * @name queue.Controllers.QueueListController
 * @description QueueListController
 * @requires ng.$scope
*/
angular
    .module('queue')
    .controller('QueueListController', [
        '$scope',
        '$filter',
        'localStorageService',
        function($scope, $filter, Storage) {
            $scope.queues = angular.fromJson(Storage.get('queuesModel'));

            $scope.calcEstimate = function(eDate) {
                var estimateTime = ~~((new Date(eDate) - new Date()) / (1000*60*60));
                return $filter('estimate')(estimateTime);
            };
        }
]);
