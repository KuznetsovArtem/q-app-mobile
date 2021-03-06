'use strict';

/**
 * @ngdoc directive
 * @name login.Directives.footerBtn
 * @description footerBtn directive
 */
angular
    .module('login')
    .directive('footerBtn', [
        function() {
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs, controller) {
                    iElm[0].style.top = iElm.position().top + 'px';
                    iElm[0].style.bottom = 'auto';
                }
            };
        }
    ])
    .directive('modalMaxHeight', [
        function() {
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm) {
                    console.log('max height linked');
                    iElm[0].style.maxHeight = window.innerHeight - 125 + 'px';
                    iElm[0].style.overflowY =  'scroll';
                }
            };
        }
    ]);;
