/**
 * City model events
 */

'use strict';

import {EventEmitter} from 'events';
import City from './city.model';
var CityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CityEvents.setMaxListeners(20);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  City.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CityEvents.emit(event + ':' + doc._id, doc);
    CityEvents.emit(event, doc);
  }
}

export default CityEvents;
