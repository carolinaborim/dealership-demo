'use strict';

describe('Controller: EquipmentctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('fuseTestApp'));

  var EquipmentctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EquipmentctrlCtrl = $controller('EquipmentctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EquipmentctrlCtrl.awesomeThings.length).toBe(3);
  });
});
