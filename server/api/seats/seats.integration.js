'use strict';

var app = require('../..');
import request from 'supertest';

var newSeats;

describe('Seats API:', function() {

  describe('GET /api/seats', function() {
    var seatss;

    beforeEach(function(done) {
      request(app)
        .get('/api/seats')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seatss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seats', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seats')
        .send({
          name: 'New Seats',
          info: 'This is the brand new seats!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeats = res.body;
          done();
        });
    });

    it('should respond with the newly created seats', function() {
      expect(newSeats.name).to.equal('New Seats');
      expect(newSeats.info).to.equal('This is the brand new seats!!!');
    });

  });

  describe('GET /api/seats/:id', function() {
    var seats;

    beforeEach(function(done) {
      request(app)
        .get('/api/seats/' + newSeats._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seats = res.body;
          done();
        });
    });

    afterEach(function() {
      seats = {};
    });

    it('should respond with the requested seats', function() {
      expect(seats.name).to.equal('New Seats');
      expect(seats.info).to.equal('This is the brand new seats!!!');
    });

  });

  describe('PUT /api/seats/:id', function() {
    var updatedSeats;

    beforeEach(function(done) {
      request(app)
        .put('/api/seats/' + newSeats._id)
        .send({
          name: 'Updated Seats',
          info: 'This is the updated seats!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeats = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeats = {};
    });

    it('should respond with the updated seats', function() {
      expect(updatedSeats.name).to.equal('Updated Seats');
      expect(updatedSeats.info).to.equal('This is the updated seats!!!');
    });

  });

  describe('DELETE /api/seats/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seats/' + newSeats._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seats does not exist', function(done) {
      request(app)
        .delete('/api/seats/' + newSeats._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
