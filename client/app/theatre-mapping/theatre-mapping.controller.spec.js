'use strict';

describe('Component: TheatreMappingComponent', function () {

  // load the controller's module
  beforeEach(module('movieApp'));

  var TheatreMappingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheatreMappingComponent = $componentController('theatre-mapping', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
