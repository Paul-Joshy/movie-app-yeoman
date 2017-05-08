/**
 * Seats model events
 */

'use strict';

import {EventEmitter} from 'events';
import Seats from './seats.model';
var SeatsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeatsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Seats.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SeatsEvents.emit(event + ':' + doc._id, doc);
    SeatsEvents.emit(event, doc);
  }
}

export default SeatsEvents;
