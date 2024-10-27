import Show from '../models/showModel.js';
import Theater from '../models/theaterModel.js';

// Function to add a new show
export const addShow = async (req, res) => {
    try {
        const { movie, showtime, seatsAvailable, pricePerSeat } = req.body; // Expecting movie as a string
        const image = req.file ? req.file.path : null;

        // Validate required fields
        if (!movie || !showtime || !seatsAvailable || !pricePerSeat) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new show without a theater reference
        const show = new Show({
            movie, // Movie is taken directly as a string
            showtime,
            seatsAvailable,
            pricePerSeat,
            image,
        });

        await show.save();
        res.status(201).json({ message: 'Show added successfully', show });
    } catch (error) {
        console.error("Error adding show:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Function to delete a show
export const deleteShow = async (req, res) => {
    try {
        const { id } = req.params;
        const show = await Show.findByIdAndDelete(id);

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        res.status(200).json({ message: 'Show deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get details of a show
export const getShowDetails = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id)
            .populate('movie'); // Populate movie details only

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to list all shows
export const listShows = async (req, res) => {
    try {
        const shows = await Show.find();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to list shows by theater owner
export const listShowsByOwner = async (req, res) => {
    try {
        const { ownerId } = req.query;

        // Find theaters owned by the specific owner
        const theaters = await Theater.find({ owner: ownerId });
        const theaterIds = theaters.map(theater => theater._id);

        // Find shows for the theaters owned by this owner
        const shows = await Show.find({ theater: { $in: theaterIds } })
            .populate('theater') // Include theater details
            .populate('movie'); // Include movie details

        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
