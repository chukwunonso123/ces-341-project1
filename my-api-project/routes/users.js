import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (authentication required)
router.get('/', authMiddleware, getUsers);

export default router;
