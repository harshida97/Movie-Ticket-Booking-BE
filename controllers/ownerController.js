import bcrypt from 'bcrypt'
import Owner from '../models/ownerModel.js'
import { ownerToken } from '../utils/generateToken.js'


///// get all owners /////
export const getAllOwners = async (_req, res) => {
  const owners = await Owner.find();
  res.send(owners);
};



//signup//
const signup = async (req,res) =>{
    try {
        const {name,email,password} = req.body
        console.log(email)
        const ownerExist = await Owner.findOne({ email });
        

        if(ownerExist){
            return res.send("Owner is already exist").status(400);
        }

         const saltRounds = 10;
         const hashPassword = await bcrypt.hash(password, saltRounds);

         const newOwner = new Owner({
            name,
            email,
            hashPassword
         });

         const newOwnerCreated = await newOwner.save();
         
         if (!newOwnerCreated) {
            return res.send("Owner is not registered");
          }

          const token = ownerToken(email);
          res.cookie("token", token)
          res.status(201).send("Signed successfully!");
        
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
        
    }

}


// signin///
const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const owner = await Owner.findOne({ email });
  
      if (!owner) {
        return res.send("Owner not found");
      }
  
      const matchPassword = await bcrypt.compare(password, owner.hashPassword);
  
      if (!matchPassword) {
        return res.send("Password is not correct");
      }
  
      const token = ownerToken(email);
      res.cookie("token", token);
      res.status(200).send({message:"Logged in!",auth:true,token});
      
      
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).send("Internal Server Error");
    }
  };


 export {signup,signin}