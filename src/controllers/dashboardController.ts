import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.id);
    const transactions = await Transaction.find({ userId: req.user.id });

    res.json({
      balance: user?.balance,
      transactions,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const airtimeToCash = async (req: Request, res: Response): Promise<void> => {
  const { amount } = req.body;
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user || user.balance < amount) {
      res.status(400).json({ message: 'Insufficient balance' });
      return;
    }

    user.balance -= amount;
    await user.save();

    await Transaction.create({
      userId: user._id,
      amount,
      type: 'debit',
      description: 'Airtime to cash conversion',
    });

    res.json({ message: 'Conversion successful', newBalance: user.balance });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

