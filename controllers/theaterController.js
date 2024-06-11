import Theater from '../models/theaterModel.js';


///////  get All theaters ////
export const getAllTheaters = async (req, res) => {
    const theaters = await Theater.find();
    res.send(theaters);
  };


////////////// Add theater /////////////
export const  addTheaterDetails= async (req,res) =>{
    try {
        const {theaterName,address,mobileNumber,seats} = req.body
 
        const addTheater = new Theater({
            theaterName,
            address,
            mobileNumber,
            seats
            
          });
        
          const newTheaterAdded = await addTheater.save();
        if (!newTheaterAdded) {
          return res.send("Theater details is not added");
        }
        return res.send(newTheaterAdded);

    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to add theater");
        
    }
}

////////////// update theater Details ///////////

export const updateTheaterDetails = async (req, res) => {
    const id = req.params.id;
    const{theaterName,address,mobileNumber} = req.body
  
    const updatedTheaterDetails = await Theater.findOneAndUpdate({_id:id },{theaterName,address,mobileNumber },
      {
        new: true,   // it shows the updated value at that time
      }
    );
  
    if (!updatedTheaterDetails) {
      return res.send("Theater Details is not updated");
    }
    console.log(updatedTheaterDetails);
    return res.send(updatedTheaterDetails);
  };

 ////////  delete theater details ////////
  
 export const deleteTheaterDetails = async (req, res) => {
    const id = req.params.id;
    const deleteTheaterName = await Theater.deleteOne({_id:id });
    if (!deleteTheaterName) {
      return res.send("Theater details is not deleted");
    }
    return res.send("Theater details is deleted");
  };                                                         