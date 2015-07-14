'use strict';

/**
 * @ngdoc directive
 * @name core.Directives.loadingLayer
 * @description loadingLayer directive
 */
angular
    .module('core')
    .directive('loadingLayer', [
        '$rootScope',
        function($rootScope) {
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                controller: function($scope, $element, $attrs, $transclude) {
                    //$scope.$broadcast('loading.show', [1,2,3]);
                    $scope.isShow = false;
                    $rootScope.$on('loading.show', function(event, data) {
                        $scope.isShow = true;
                    });

                    $rootScope.$on('loading.hide', function(event, mass) {
                        $scope.isShow = false;
                    })
                },
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                template: '<div class="loading-layer" ng-show="isShow"></div>',
                // templateUrl: '',
                replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs, controller) {

                }
            };
        }
    ]);
