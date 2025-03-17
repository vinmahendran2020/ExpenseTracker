import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/transactions", async (_req, res) => {
    const transactions = await storage.getTransactions();
    res.json(transactions);
  });

  app.get("/api/balance", async (_req, res) => {
    const balance = await storage.getBalance();
    res.json(balance);
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const transaction = await storage.createTransaction(result.data);
    res.json(transaction);
  });

  return createServer(app);
}
