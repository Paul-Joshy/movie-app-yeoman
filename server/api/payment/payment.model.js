'use strict';

import mongoose from 'mongoose';

var PaymentSchema = new mongoose.Schema({
  userID: {
    type:String
  },
  name: {
    type: String,
    required: true
  },
  theatre: {
    type: String,
    required: true
  },
  bookedSeats: [{
    classType: String,
    row: String,
    col: String
  }],
  grandTotal:{
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

PaymentSchema.index({userID: 1, theatre: 1, 'bookedSeats.row': 1, 'bookedSeats.col': 1}, {unique: true});

export default mongoose.model('Payment', PaymentSchema);
