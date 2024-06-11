import express from "express";
const userRouter = express.Router();
import {signup,signin, getBookingofUser} from '../controllers/userController.js';
import { reserveTicket} from '../controllers/bookingController.js'
import authenticateUser from "../middlewares/userMiddleware.js";


userRouter.post("/signup",signup);
userRouter.post("/signin",signin);
userRouter.post("/reserve-ticket",reserveTicket)
//userRouter.delete("/delete-booking",authenticateUser,deleteBooking)
userRouter.get("/userbooking/:id", getBookingofUser)


export default userRouter;