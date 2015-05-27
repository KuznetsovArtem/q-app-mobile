'use strict';

describe('Controller: MailController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('mail'));

    var MailController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MailController = $controller('MailController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
