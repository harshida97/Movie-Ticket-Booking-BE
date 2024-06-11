import express from "express"
const adminRouter =express.Router();
import { signup,signin } from "../controllers/adminController.js";
import {getAllMovies,newMovie,updateMovie,deleteMovie} from "../controllers/movieController.js"
import {getAllUsers} from "../controllers/userController.js"
import {getAllTheaters} from "../controllers/theaterController.js"
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import {getAllOwners} from "../controllers/ownerController.js"
//import { getAllBookings } from "../controllers/bookingController.js";


adminRouter.post("/signup",signup);
adminRouter.post("/signin",signin);

adminRouter.post("/add-show",authenticateAdmin,newMovie); 
adminRouter.get("/get-allMovies",authenticateAdmin,getAllMovies);
adminRouter.put("/update-show/:id",authenticateAdmin,updateMovie); 
adminRouter.delete("/delete-show/:id",authenticateAdmin,deleteMovie); 
adminRouter.get("/get-allUsers",authenticateAdmin,getAllUsers);
adminRouter.get("/get-allTheaters",authenticateAdmin,getAllTheaters);
adminRouter.get("/get-allowners",authenticateAdmin,getAllOwners);
//adminRouter.get("/get-allbookings",getAllBookings)



export default adminRouter;