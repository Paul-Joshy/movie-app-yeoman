'use strict';

import mongoose from 'mongoose';

var TheatreMappingSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true
  },
  theatre: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  dates: {
    type:[String],
    required:true
  },
  timings: {
    type:[String],
    required:true
  }
});

TheatreMappingSchema.index({ movie: 1, theatre: 1, city: 1 }, { unique: true });
export default mongoose.model('TheatreMapping', TheatreMappingSchema);
