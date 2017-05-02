/**
 * TheatreMapping model events
 */

'use strict';

import {EventEmitter} from 'events';
import TheatreMapping from './theatre-mapping.model';
var TheatreMappingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheatreMappingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TheatreMapping.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheatreMappingEvents.emit(event + ':' + doc._id, doc);
    TheatreMappingEvents.emit(event, doc);
  }
}

export default TheatreMappingEvents;
