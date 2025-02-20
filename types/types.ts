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
