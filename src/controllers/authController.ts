import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { loginSchema } from '../validations/authValidation';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

