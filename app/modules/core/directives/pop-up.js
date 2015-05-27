'use strict';

/**
 * @ngdoc directive
 * @name core.Directives.popUp
 * @description popUp directive
 */
angular
    .module('core')
    .directive('popUp', [
        function() {
            return {
                name: 'popUp',
                // priority: 1,
                // terminal: true,
                scope: true, // {} = isolate, true = child, false/undefined = no change
                controller: 'PopUpController',
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                templateUrl: 'modules/core/views/pop-up.html',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs, controller) {

                }
            };
        }
    ]);
