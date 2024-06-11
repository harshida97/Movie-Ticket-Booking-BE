import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
    theaterName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    seats: [{
        seatNumber: {
            type: String,
            required: true
        },
        reserved: {
            type: Boolean,
            default: false
        }
    }]


})

const Theater = mongoose.model('Theater',theaterSchema)

export default Theater;