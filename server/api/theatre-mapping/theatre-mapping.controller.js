/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/theatre-mappings              ->  index
 * POST    /api/theatre-mappings              ->  create
 * GET     /api/theatre-mappings/:id          ->  show
 * PUT     /api/theatre-mappings/:id          ->  update
 * DELETE  /api/theatre-mappings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import TheatreMapping from './theatre-mapping.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of TheatreMappings
export function index(req, res) {
  return TheatreMapping.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TheatreMapping from the DB
export function show(req, res) {
  return TheatreMapping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//gets TheatreMappings of a movie from the DB
// export function getMovie(req, res){
//   return TheatreMapping.find({ movie: req.params.movie });
// }

// Creates a new TheatreMapping in the DB
export function create(req, res) {
  return TheatreMapping.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));

}

// Updates an existing TheatreMapping in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return TheatreMapping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TheatreMapping from the DB
export function destroy(req, res) {
  return TheatreMapping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
