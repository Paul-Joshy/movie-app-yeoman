'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theatreMappingCtrlStub = {
  index: 'theatreMappingCtrl.index',
  show: 'theatreMappingCtrl.show',
  create: 'theatreMappingCtrl.create',
  update: 'theatreMappingCtrl.update',
  destroy: 'theatreMappingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theatreMappingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theatre-mapping.controller': theatreMappingCtrlStub
});

describe('TheatreMapping API Router:', function() {

  it('should return an express router instance', function() {
    expect(theatreMappingIndex).to.equal(routerStub);
  });

  describe('GET /api/theatre-mappings', function() {

    it('should route to theatreMapping.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theatreMappingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theatre-mappings/:id', function() {

    it('should route to theatreMapping.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theatreMappingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theatre-mappings', function() {

    it('should route to theatreMapping.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theatreMappingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theatre-mappings/:id', function() {

    it('should route to theatreMapping.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theatreMappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theatre-mappings/:id', function() {

    it('should route to theatreMapping.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theatreMappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theatre-mappings/:id', function() {

    it('should route to theatreMapping.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theatreMappingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
