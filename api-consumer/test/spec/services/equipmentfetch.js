'use strict';

describe('Service: equipmentfetch', function () {

  // load the service's module
  beforeEach(module('fuseTestApp'));

  // instantiate service
  var equipmentfetch;
  beforeEach(inject(function (_equipmentfetch_) {
    equipmentfetch = _equipmentfetch_;
  }));

  it('should do something', function () {
    expect(!!equipmentfetch).toBe(true);
  });

});
