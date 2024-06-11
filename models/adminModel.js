import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }, 
    hashPassword:{
        type:String,
        required:true
    } ,
    role: {
        type: String,
        enum: ['admin']
      },
     addedMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
     }] 

});

const Admin = mongoose.model('Admin', adminSchema); // Correct model naming

export default Admin;
