import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type: String 
    },
    description:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    time: {
        type: Date,
        required: true
      },
      pricePerSeat: {
        type: Number,
        required: true
      },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookig"
    }],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        required:true
    }

})

const Movie = mongoose.model('Movie',movieSchema)

export default Movie;