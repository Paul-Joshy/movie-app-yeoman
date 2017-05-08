'use strict';

import mongoose from 'mongoose';

var SeatsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Seats', SeatsSchema);
