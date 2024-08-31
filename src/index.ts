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

app.get('/', (req, res) => {
  res.send('Welcome to Freshtech API!');
});

// Import and organize routes
import { Router } from 'express';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/', dashboardRoutes);

app.use('/api', apiRouter);

// Global error-handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('An error occurred:', err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});
