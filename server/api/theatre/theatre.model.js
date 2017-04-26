'use strict';

import mongoose from 'mongoose';

var TheatreSchema = new mongoose.Schema({
  name: String,
  location: String,
  screenCount: Number,
  seatCount: Number,
  class: [{
    name: String,
    seatCount: Number
  }]
});

export default mongoose.model('Theatre', TheatreSchema);
