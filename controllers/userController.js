import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import Booking from '../models/bookingModel.js';

///// get all users /////
export const getAllUsers = async (_req, res) => {
  const users = await User.find();
  res.send(users);
};



  ///// signup /////
 const signup =async (req,res) =>{
    try {
        const { name,mobileNumber,email, password} = req.body
    console.log(email);
 
    const userExist = await User.findOne({ email });
    
    
    if (userExist) {
      return res.send("User is already exist").status(400);
    }
    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        name,
        mobileNumber,
        email,
        hashPassword
    });
    
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);
    res.cookie("token", token)
    res.send("Signed successfully!");
        
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}

///// signin  /////
 const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.send("User not found");
      }
  
      const matchPassword = await bcrypt.compare(password, user.hashPassword);
  
      if (!matchPassword) {
        return res.send("Password is not correct");
      }
  
      const token = generateToken(email);
      res.cookie("token", token);
      res.status(200).send({message:"Logged in!",auth:true,token});
      
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).send("Internal Server Error");
    }
  };
  

  export {signup,signin}


  ////////// get booking of a user by id

  export const getBookingofUser = async (req,res) => {
    const id = req.params.id
    try {
      let userBookings = await Booking.find({user:id})
      if(!userBookings){
        return res.status(500).json({message:"Unable to get Booking"})
      }
      return res.status(200).json({userBookings})
      
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).send("Internal Server Error");
      
    }
  }