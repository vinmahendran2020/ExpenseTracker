import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BalanceCardProps {
  balance: {
    balance: number;
    expenses: number;
  };
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Account Balance</h2>
        <select className="bg-transparent border-none text-sm text-muted-foreground">
          <option>October</option>
        </select>
      </div>

      <div className="text-4xl font-bold">{formatCurrency(balance.balance)}</div>

      <Card className="bg-red-50">
        <CardContent className="p-4">
          <div className="text-red-600 font-medium mb-1">Total Expenses</div>
          <div className="text-xl font-bold text-red-700">
            {formatCurrency(balance.expenses)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}