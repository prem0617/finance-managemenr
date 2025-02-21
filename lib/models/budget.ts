import { IBudget } from "@/types/types";
import mongoose, { Schema, Types } from "mongoose";

const BudgetSchema = new Schema<IBudget>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget =
  (mongoose.models.Budget as mongoose.Model<IBudget>) ||
  mongoose.model<IBudget>("Budget", BudgetSchema);
