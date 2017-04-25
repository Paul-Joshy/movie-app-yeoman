'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  Title: String,
  Year: Number,
  Genre: String,
  Plot: String,
  Actors: String,
  Director: String,
  Runtime: String
});

export default mongoose.model('Movie', MovieSchema);
