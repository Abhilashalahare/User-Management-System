import express from 'express';
import { getAllUsers, updateUserStatus, updateUserProfile, updateUserByAdmin } from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateUserProfile);
router.get('/', protect, admin, getAllUsers);
router.patch('/:id/status', protect, admin, updateUserStatus);
router.put('/:id', protect, admin, updateUserByAdmin);

export default router;