import { Types } from "mongoose";

export interface ITransaction {
  amount: number;
  description: string;
  date: Date;
  category: string;
}

export interface Transactions {
  amount: number;
  _id: string;
  description: string;
  date: Date;
  category: string;
}

export interface ICategory {
  _id?: string;
  name: string;
}

export interface IBudget {
  _id?: string;
  name: string;
  amount: number;
  categoryId: Types.ObjectId;
}
