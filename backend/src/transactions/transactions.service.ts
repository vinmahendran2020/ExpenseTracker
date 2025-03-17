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

  async getBalance(): Promise<{ balance: number; income: number; expenses: number }> {
    let income = 0;
    let expenses = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === TransactionType.INCOME) {
        income += Number(transaction.amount);
      } else {
        expenses += Number(transaction.amount);
      }
    }

    return {
      balance: income - expenses,
      income,
      expenses,
    };
  }
}
