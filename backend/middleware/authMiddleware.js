import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user || req.user.status === 'inactive') {
                return res.status(401).json({ 
                    message: 'Not authorized: Account is inactive or does not exist' 
                });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' }); 
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' }); 
    }
};

// Admin Authorization - restricts access to admins only 
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admin permissions required' });
    }
};