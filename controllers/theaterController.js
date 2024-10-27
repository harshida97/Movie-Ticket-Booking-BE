// controllers/theaterController.js
import Theater from '../models/theaterModel.js';

export const registerTheater = async (req, res) => {
    const { name, location } = req.body;
    const theater = new Theater({ name, location, owner: req.user.id });
    await theater.save();
    res.json({ message: 'Theater registered successfully' });
};

export const listTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().populate('owner'); // Populate owner if needed
    res.json(theaters); // Return all theaters as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching theaters: ' + error.message });
  }
};

export const getTheaters = async (req, res) => {
  
  const theater = await Theater.findById(req.params.id).populate('owner');
    res.json(theater);
};


export const approveTheater = async (req, res) => {
  const { theaterId } = req.params;

  try {
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    if (theater.isApproved) {
      return res.status(400).json({ message: 'Theater is already approved' });
    }

    theater.isApproved = true; // Set isApproved to true
    await theater.save(); // Save the updated theater

    return res.status(200).json({ message: 'Theater approved successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



export const deleteTheater = async (req, res) => {
  const theaterId = req.params.id;

  try {
    const deletedTheater = await Theater.findByIdAndDelete(theaterId);
    if (!deletedTheater) {
      return res.status(404).json({ message: 'Theater not found.' });
    }
    res.status(200).json({ message: 'Theater deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting theater: ' + error.message });
  }
};




{/*export const getTheaterById = async (req, res) => {
  const { theaterId } = req.params;

  try {
      const theater = await Theater.findById(theaterId).populate('owner'); // Populate owner if necessary
      if (!theater) {
          return res.status(404).json({ message: 'Theater not found' });
      }
      res.json(theater);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching theater: ' + error.message });
  }
};    */}