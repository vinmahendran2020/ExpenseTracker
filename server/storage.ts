import { type Transaction, type InsertTransaction } from "@shared/schema";

export interface IStorage {
  getTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getBalance(): Promise<{ balance: number; income: number; expenses: number }>;
}

export class MemStorage implements IStorage {
  private transactions: Map<number, Transaction>;
  private currentId: number;

  constructor() {
    this.transactions = new Map();
    this.currentId = 1;
  }

  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      date: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getBalance(): Promise<{ balance: number; income: number; expenses: number }> {
    let income = 0;
    let expenses = 0;

    for (const transaction of this.transactions.values()) {
      if (transaction.type === "income") {
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

export const storage = new MemStorage();
