'use strict';

import mongoose from 'mongoose';

var CitySchema = new mongoose.Schema({
  name: {
    required: true,
    unique: true,
    type: String
  }
});

export default mongoose.model('City', CitySchema);
