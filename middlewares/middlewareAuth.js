// middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('JWT Token:', token);
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id);
        console.log('User from DB:', req.user);  // Add this line
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

export const isOwner = (req, res, next) => {
    if (req.user.role === 'owner') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};
