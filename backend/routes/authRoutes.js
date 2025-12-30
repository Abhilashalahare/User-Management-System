import express from 'express';
import { registerUser, loginUser, getMe, logout } from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;