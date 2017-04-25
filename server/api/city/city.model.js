'use strict';

import mongoose from 'mongoose';

var CitySchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('City', CitySchema);
