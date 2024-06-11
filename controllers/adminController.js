import bcrypt from 'bcrypt'
import Admin from '../models/adminModel.js'
import { adminToken } from '../utils/generateToken.js'

//signup//
const signup = async (req,res) =>{
    try {
        const{email,password} = req.body
        console.log(email)
        const adminExist = await Admin.findOne({ email });
        

        if(adminExist){
            return res.send("Admin is already exist").status(400);
        }

         const saltRounds = 10;
         const hashPassword = await bcrypt.hash(password, saltRounds);

         const newAdmin = new Admin({
            email,
            hashPassword,
            role:"admin"
         });

         const newAdminCreated = await newAdmin.save();
         
         if (!newAdminCreated) {
            return res.send("Admin is not created");
          }

          const token = adminToken(newAdminCreated);
          res.cookie("token", token)
          return res.status(201).send("Signed successfully!");
        
    } catch (error) {
        console.log(error, "Something wrong");
        return res.status(500).send("Internal Server Error");
        
    }

}


// signin///
const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.send("Admin not found");
      }
  
      const matchPassword = await bcrypt.compare(password, admin.hashPassword);
  
      if (!matchPassword) {
        return res.send("Password is not correct");
      }
  
      const token = adminToken(admin);
      res.cookie("token", token);
      return res.status(200).json({message:"Logged in!",token,id:admin._id});
      
      //res.send("id",admin._id);
      
    } catch (error) {
      console.log(error, "Something wrong");
      return res.status(500).send("Internal Server Error");
    }
  };


 export {signup,signin}
 