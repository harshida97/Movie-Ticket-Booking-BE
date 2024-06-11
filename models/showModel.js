import mongoose from "mongoose"

const showSchema = new mongoose.Schema({
movie: {
    type: mongoose.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theater: {
    type: mongoose.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  
  seats: [{
    number: String,
    reserved: {
      type: Boolean,
      default: false
    }
  }]
});

const Show = mongoose.model('Show', showSchema);
export default Show;