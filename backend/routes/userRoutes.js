import express from 'express';
import { getAllUsers, updateUserStatus, updateUserProfile } from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateUserProfile);
router.get('/', protect, admin, getAllUsers);
router.patch('/:id/status', protect, admin, updateUserStatus);

export default router;