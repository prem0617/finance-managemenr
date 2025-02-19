export interface ITransaction {
  amount: number;
  description: string;
  date: Date;
}

export interface Transactions {
  amount: number;
  _id: string;
  description: string;
  date: Date;
}
