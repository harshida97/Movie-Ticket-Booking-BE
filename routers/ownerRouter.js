import express from "express"
const ownerRouter =express.Router();
import { signup,signin } from "../controllers/ownerController.js";
import {newMovie,updateMovie,deleteMovie} from "../controllers/movieController.js"
import { addTheaterDetails,updateTheaterDetails,deleteTheaterDetails,getAllTheaters} from "../controllers/theaterController.js"
import authenticateOwner from "../middlewares/ownerMiddleware.js"


ownerRouter.post("/signup",signup);
ownerRouter.post("/signin",signin);

ownerRouter.post("/add-theater",authenticateOwner,addTheaterDetails); 
ownerRouter.get("/all-theaters",getAllTheaters); 
ownerRouter.put("/update-theater/:id",authenticateOwner,updateTheaterDetails);
ownerRouter.delete("/delete-theater/:id",authenticateOwner,deleteTheaterDetails);
ownerRouter.post("/add-movie",authenticateOwner,newMovie); 
ownerRouter.put("/update-movie/:id",authenticateOwner,updateMovie);
ownerRouter.delete("/delete-movie/:id",authenticateOwner,deleteMovie);






export default ownerRouter;