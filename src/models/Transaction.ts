import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  type: 'credit' | 'debit';
  description?: string;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);

