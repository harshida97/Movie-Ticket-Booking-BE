import Show from '../models/showModel.js'; 

// Create a new show
export const createShow = async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all shows
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find().populate('movie').populate('theater');
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single show by ID
export const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('movie').populate('theater');
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a show
export const updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('movie').populate('theater');
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.status(200).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a show
export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.status(200).json({ message: 'Show deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
