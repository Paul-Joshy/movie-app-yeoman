'use strict';

import mongoose from 'mongoose';

var TheatreSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  city: {
    type:String,
    required:true,
  },
  location: {
    type:String,
    required:true,
  },
  screenCount: Number,
  seatCount: Number,
  class: [{
    name: String,
    seatCount: Number
  }]
});

TheatreSchema.index({ name: 1, city: 1, location: 1 }, { unique: true });
export default mongoose.model('Theatre', TheatreSchema);
