'use strict';

/**
 * @ngdoc service
 * @name queue.Services.QueueModel
 * @description QueueModel Service
 */
angular
    .module('queue')
    .service('QueueModel', [

        function() {

            return {
                data : [1,2,3,4,5,6,7,8,9,0]
            }

        }
    ]);
