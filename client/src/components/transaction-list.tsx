import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Repeat, UtensilsCrossed } from "lucide-react";
import { type Transaction } from "@shared/schema";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

const icons = {
  shopping: ShoppingBag,
  subscription: Repeat,
  food: UtensilsCrossed,
};

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <button className="text-sm text-primary font-medium">See All</button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.slice(0, 3).map((transaction) => {
          const Icon = icons[transaction.category as keyof typeof icons];
          
          return (
            <div key={transaction.id} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "h:mm a")}
                </div>
              </div>
              <div className={transaction.type === "expense" ? "text-red-600" : "text-emerald-600"}>
                {transaction.type === "expense" ? "-" : "+"}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
