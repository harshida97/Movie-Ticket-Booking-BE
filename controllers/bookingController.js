// controllers/bookingController.js
import Booking from '../models/bookingModel.js';
import Show from '../models/showModel.js';

export const createBooking = async (req, res) => {
    const { show, seatsBooked } = req.body;
    const showDetails = await Show.findById(show);
    const totalAmount = seatsBooked * showDetails.pricePerSeat;
    const booking = new Booking({ user: req.user.id, show, seatsBooked, totalAmount });
    await booking.save();
    res.json({ message: 'Booking successful' });
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