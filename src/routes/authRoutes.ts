import { Router } from 'express';
import { login } from '../controllers/authController';
import { loginSchema } from '../validations/authValidation';
import { validate } from '../middleware/validationMiddleware';
import mongoose from 'mongoose';
import User from '../models/User'; // import the User model

const router = Router();

// Add a GET route to handle GET requests
router.get('/login', async (req, res) => {
  try {
    const users = await User.find().select('username password'); // query the User model to fetch all users with username and password fields
    const loginDetails = users.map((user) => ({ username: user.username, password: user.password }));
    res.json(loginDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching login details' });
  }
});

// Keep the existing POST route
router.post('/login', validate(loginSchema), login);

export default router;
