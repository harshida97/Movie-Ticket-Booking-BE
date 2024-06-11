
import Admin from '../models/adminModel.js';
import Movie from '../models/movieModel.js'
import { fileName } from "../upload.js";

//////// get allMovies /////////

export const getAllMovies = async (req, res) => {
    const allMovies = await Movie.find();
    res.send(allMovies);
  };
      ///////// add new movie /////////////
      export const newMovie = async (req, res) => { 
  try{

        const { title, description, releaseDate,time,pricePerSeat,adminEmail } = req.body;
  
        const findAdmin = await Admin.findOne({ email: adminEmail });
        console.log('Admin found:', findAdmin);
  
        if (!findAdmin) {
          return res.send("please add admin first");
        }
  
        const addMovie = new Movie({
          title,
          description,
          releaseDate,
          time,
          pricePerSeat,
          image:fileName,
          admin: findAdmin._id,
          
        });
        
        
        const newMovieAdded = await addMovie.save();
        if (!newMovieAdded) {
          return res.send("Movie is not added");
        }
        return res.send(newMovieAdded);
    



    } catch (error) {
      console.log("something went wrong", error);
     return res.send("failed to add movie");
    }
  }




  // update Movie
  
export const updateMovie = async (req, res) => {
    const id = req.params.id;

    const{title,description,price,admin} = req.body
  
    const updatedMovie = await Movie.findOneAndUpdate({ _id: id },{ title,description, price, admin },
      {
        new: true,   // it shows the updated value at that time
      }
    );
  
    if (!updatedMovie) {
      return res.send("Movie is not updated");
    }
    console.log(updatedMovie);
    return res.send(updatedMovie);
  };



  //delete Movie
  
export const deleteMovie = async (req, res) => {
    const id = req.params.id;
    const deleteId = await Movie.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("movie not deleted");
    }
    return res.send("Movie deleted");
  };                                                                                                                                                                