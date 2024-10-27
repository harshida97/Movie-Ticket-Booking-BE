// models/Show.js
import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    //theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
   // movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    movie:{type:String,required:true},
    showtime: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    pricePerSeat: { type: Number, required: true },
    image: { type: String }, // Add a field for the image URL or path
}, { timestamps: true });

export default mongoose.model('Show', showSchema);
