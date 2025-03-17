import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType } from './transaction.interface';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];
  private currentId = 1;

  async getAll(): Promise<Transaction[]> {
    return this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async create(data: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> {
    const transaction: Transaction = {
      ...data,
      id: this.currentId++,
      date: new Date(),
    };
    this.transactions.push(transaction);
    return transaction;
  }

  async getBalance(): Promise<{ balance: number; expenses: number }> {
    let expenses = 0;

    for (const transaction of this.transactions) {
      expenses += Number(transaction.amount);
    }

    return {
      balance: -expenses,
      expenses,
    };
  }
}