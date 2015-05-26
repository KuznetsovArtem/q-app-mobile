'use strict';

describe('Controller: PopUpController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var PopUpController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        PopUpController = $controller('PopUpController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
