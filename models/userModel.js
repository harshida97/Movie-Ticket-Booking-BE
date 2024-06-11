import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
         type:String,
         required:true
        },
    mobileNumber:{
         type:Number,
         required:true
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hashPassword:{
         type:String,
         required:true,
         unique:true,
         minLength:6
        },
    role: {
            type: String,
            enum: ['admin']
            
          },
    bookings:[{
            type:mongoose.Types.ObjectId,
            ref:"Booking"
    } ]     
});

const User = mongoose.model('User', userSchema); // Correct model naming

export default User;
