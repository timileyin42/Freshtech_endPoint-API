import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables.');
}

mongoose.connect(MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use morgan to log requests on the server
app.use(morgan('combined'));

app.use(express.json());

import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

