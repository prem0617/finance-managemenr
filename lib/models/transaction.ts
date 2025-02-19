import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  category: string;
  date: Date;
  description: string;
}

const TransactionSchema = new Schema<Transaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
