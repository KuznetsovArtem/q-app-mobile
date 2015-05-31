'use strict';

/**
 * @ngdoc object
 * @name login.Controllers.LoginController
 * @description LoginController
 * @requires ng.$scope
*/
angular
    .module('login')
    .controller('LoginController', [
        '$scope',
        'localizationService',
        '$modal',
        '$log',
        function($scope, localizationService, $modal, $log) {
            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = false; // TODO: move to config factory

            $scope.restorePass = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modules/login/views/restore-pass.html',
                    controller: 'ModalInstanceCtrl',
                    size: size/*,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }*/
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        }
    ])
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.ok = function () {
            //$modalInstance.close($scope.selected.item);
            $modalInstance.close('TODO:DATA');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
