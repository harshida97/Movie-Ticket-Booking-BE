import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
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
        enum: ['owner'],
        
      }

});

const Owner = mongoose.model('Owner', ownerSchema); // Correct model naming

export default Owner;
