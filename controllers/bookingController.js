// bookingController.js

import Booking from '../models/bookingModel.js';
import Movie from '../models/movieModel.js';
import Theater from '../models/theaterModel.js';

export const reserveTicket = async (req, res) => {
  const { userId, movieId, theaterId, seatNumbers } = req.body;

  // Check if seatNumbers is defined and is an array
  if (!Array.isArray(seatNumbers)) {
    return res.status(400).json({ message: 'Seat numbers are missing or invalid' });
  }

  try {
    // Find the movie and theater
    const movie = await Movie.findById(movieId);
    const theater = await Theater.findById(theaterId);

    // Validate movie and theater existence
    if (!movie || !theater) {
      return res.status(404).json({ message: 'Movie or theater not found' });
    }

    // Calculate total price based on number of seats and price per seat
    const pricePerSeat = movie.pricePerSeat;
    if (!pricePerSeat || isNaN(pricePerSeat)) {
      return res.status(400).json({ message: 'Price per seat is invalid' });
    }

    const totalPrice = pricePerSeat * seatNumbers.length;

    // Create booking
    const booking = new Booking({
      user: userId,
      movie: movieId,
      theater: theaterId,
      seats: seatNumbers,
      totalPrice
    });

    // Save booking to database
    await booking.save();

    // Update theater seats status
    theater.seats.forEach(seat => {
      if (seatNumbers.includes(seat.number)) {
        seat.reserved = true;
      }
    });
    await theater.save();

    res.status(201).json({ message: 'Tickets reserved successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
