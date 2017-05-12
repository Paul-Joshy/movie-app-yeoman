'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: true
  },
  Year: Number,
  Genre: {
    type: String,
    required: true
  },
  Plot: {
    type: String,
    required: true
  },
  Actors: {
    type: String,
    required: true
  },
  Director: {
    type: String,
    required: true
  },
  Runtime: {
    type: String,
    required: true
  },
  Poster: {
    type: String,
    required: true
  }
});

export default mongoose.model('Movie', MovieSchema);
