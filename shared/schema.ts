import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({ 
  id: true,
  date: true 
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type TransactionCategory = {
  id: string;
  name: string;
  icon: string;
};

export const transactionCategories: TransactionCategory[] = [
  { id: "shopping", name: "Shopping", icon: "ShoppingBag" },
  { id: "subscription", name: "Subscription", icon: "Repeat" },
  { id: "food", name: "Food", icon: "UtensilsCrossed" },
];
