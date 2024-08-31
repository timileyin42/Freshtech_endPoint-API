import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // Logging the decoded token to ensure it's correctly parsed
    console.log('Decoded token:', decoded);

    // Ensure the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Attach the user ID to the request object
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

