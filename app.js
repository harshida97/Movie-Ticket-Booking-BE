import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './config/db.js';
import userRouter from './routers/userRouter.js'
import theaterRouter from './routers/theaterRouter.js';
import movieRouter from './routers/movieRouter.js';
import showRouter from './routers/showRouter.js';
import bookingRouter from './routers/bookingRouter.js';
dotenv.config();

const app = express();

// Middleware to set Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://vercel.live;");
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://movie-ticket-booking-fe-u6oc.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));

app.use('/api/users', userRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/movies', movieRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);


app.use(express.urlencoded({extended:true}));

app.use('/upload', express.static('upload')); // Serve static files from 'upload' directory

connect();
console.log('MongoDB URI from .env in app.js:', process.env.DB_URL);


const PORT = process.env.PORT || 3000; // Define PORT here
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
