import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    const transactions = await Transaction.find({ userId: req.user.id });

    res.json({
      balance: user?.balance,
      transactions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const airtimeToCash = async (req: Request, res: Response): Promise<void> => {
  const { amount } = req.body;
  try {
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
      description: 'Airtime to cash conversion'
    });

    res.json({ message: 'Conversion successful', newBalance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

