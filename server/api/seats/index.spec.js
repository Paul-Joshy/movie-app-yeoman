'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatsCtrlStub = {
  index: 'seatsCtrl.index',
  show: 'seatsCtrl.show',
  create: 'seatsCtrl.create',
  update: 'seatsCtrl.update',
  destroy: 'seatsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seats.controller': seatsCtrlStub
});

describe('Seats API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatsIndex).to.equal(routerStub);
  });

  describe('GET /api/seats', function() {

    it('should route to seats.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatsCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seats/:id', function() {

    it('should route to seats.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatsCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seats', function() {

    it('should route to seats.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatsCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seats/:id', function() {

    it('should route to seats.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seats/:id', function() {

    it('should route to seats.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seats/:id', function() {

    it('should route to seats.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatsCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
