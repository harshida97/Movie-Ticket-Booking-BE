import Booking from '../models/bookingModel.js';
import Show from '../models/showModel.js';
import Theater from '../models/theaterModel.js';
import mongoose from 'mongoose';

export const createBooking = async (req, res) => {
    const { show, seatsBooked } = req.body;

    // Start a session for a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the show details and populate the theater information
        const showDetails = await Show.findById(show)
            .populate('theater')  // Populate the theater field
            .session(session);

        if (!showDetails) {
            return res.status(404).json({ message: 'Show not found' });
        }

        // Check if enough seats are available
        if (showDetails.seatsAvailable < seatsBooked) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Check if the theater field is populated and get the theater name
        if (!showDetails.theater) {
            return res.status(404).json({ message: 'Theater not found for this show' });
        }

        const theaterId = showDetails.theater._id;  // Use the theater ObjectId here
        const theaterName = showDetails.theater.theaterName || 'Unknown Theater'; // For display purposes

        // Calculate the total amount
        const totalAmount = seatsBooked * showDetails.pricePerSeat;

        // Create the booking
        const booking = new Booking({
            user: req.user.id,  // Ensure req.user is populated from the auth middleware
            show,
            theater: theaterId,  // Store the theater ObjectId in the booking
            seatsBooked,
            totalAmount
        });

        // Save the booking
        await booking.save({ session });

        // Update the available seats for the show
        showDetails.seatsAvailable -= seatsBooked;
        await showDetails.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.json({ message: 'Booking successful', theater: theaterName });
    } catch (error) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: 'Error processing booking' });
    }
};


// Function to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('show');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
    }
};