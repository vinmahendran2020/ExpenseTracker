export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export interface CreateTransactionDto {
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
}
