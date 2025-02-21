import mongoose, { Schema } from "mongoose";
import { ITransaction } from "@/types/types";

const TransactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Using mongoose.models.Transaction with proper typing
export const Transaction =
  (mongoose.models.Transaction as mongoose.Model<ITransaction>) ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
