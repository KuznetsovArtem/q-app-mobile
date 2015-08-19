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
        'queueListModel',
        function($scope, $filter, queues) {
            $scope.queues = queues;

            $scope.calcEstimate = function(eDate) {
                var estimateTime = ~~((new Date(eDate) - new Date()) / (1000*60*60));
                return $filter('estimate')(estimateTime);
            };
        }
]);
