// bookingModel.js

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  seats: {
    type: [String], // Array of seat numbers
   required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Reserved', 'Cancelled'],
    default: 'Reserved'
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
