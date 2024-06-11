import dotenv from 'dotenv';
import express from 'express';
//import cors from 'cors';
import {connect} from './config/db.js'
import userRouter from './routers/userRouter.js'
import adminRouter from './routers/adminRouter.js';
import ownerRouter from './routers/ownerRouter.js';
import cookieParser from 'cookie-parser';  

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
//app.use(cors());

app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/owner",ownerRouter);


connect();
console.log('MongoDB URI from .env in app.js:', process.env.DB_URL);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

