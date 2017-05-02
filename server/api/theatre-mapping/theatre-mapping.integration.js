'use strict';

var app = require('../..');
import request from 'supertest';

var newTheatreMapping;

describe('TheatreMapping API:', function() {

  describe('GET /api/theatre-mappings', function() {
    var theatreMappings;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatre-mappings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatreMappings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theatreMappings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theatre-mappings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theatre-mappings')
        .send({
          name: 'New TheatreMapping',
          info: 'This is the brand new theatreMapping!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheatreMapping = res.body;
          done();
        });
    });

    it('should respond with the newly created theatreMapping', function() {
      expect(newTheatreMapping.name).to.equal('New TheatreMapping');
      expect(newTheatreMapping.info).to.equal('This is the brand new theatreMapping!!!');
    });

  });

  describe('GET /api/theatre-mappings/:id', function() {
    var theatreMapping;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatre-mappings/' + newTheatreMapping._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatreMapping = res.body;
          done();
        });
    });

    afterEach(function() {
      theatreMapping = {};
    });

    it('should respond with the requested theatreMapping', function() {
      expect(theatreMapping.name).to.equal('New TheatreMapping');
      expect(theatreMapping.info).to.equal('This is the brand new theatreMapping!!!');
    });

  });

  describe('PUT /api/theatre-mappings/:id', function() {
    var updatedTheatreMapping;

    beforeEach(function(done) {
      request(app)
        .put('/api/theatre-mappings/' + newTheatreMapping._id)
        .send({
          name: 'Updated TheatreMapping',
          info: 'This is the updated theatreMapping!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheatreMapping = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheatreMapping = {};
    });

    it('should respond with the updated theatreMapping', function() {
      expect(updatedTheatreMapping.name).to.equal('Updated TheatreMapping');
      expect(updatedTheatreMapping.info).to.equal('This is the updated theatreMapping!!!');
    });

  });

  describe('DELETE /api/theatre-mappings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theatre-mappings/' + newTheatreMapping._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theatreMapping does not exist', function(done) {
      request(app)
        .delete('/api/theatre-mappings/' + newTheatreMapping._id)
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
