'use strict';

import mongoose from 'mongoose';

var TheatreMappingSchema = new mongoose.Schema({
  movie: String,
  theatre: String,
  city: String,
  dates: [String],
  timings: [String]
});

export default mongoose.model('TheatreMapping', TheatreMappingSchema);
