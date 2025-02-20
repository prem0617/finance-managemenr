import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "@/types/types";

export interface ITransactionDocument extends Document, ITransaction {}

const TransactionSchema = new Schema<ITransactionDocument>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Using mongoose.models.Transaction with proper typing
export const Transaction =
  (mongoose.models.Transaction as mongoose.Model<ITransactionDocument>) ||
  mongoose.model<ITransactionDocument>("Transaction", TransactionSchema);
