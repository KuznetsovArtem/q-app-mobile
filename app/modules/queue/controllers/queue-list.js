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
        'localStorageService',
        function($scope, Storage) {
            $scope.queues = angular.fromJson(Storage.get('queuesModel'));
        }
]);
