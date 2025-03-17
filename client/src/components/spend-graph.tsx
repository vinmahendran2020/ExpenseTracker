import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import { type Transaction } from "@shared/schema";
import { format } from "date-fns";

interface SpendGraphProps {
  transactions: Transaction[];
}

export default function SpendGraph({ transactions }: SpendGraphProps) {
  const data = transactions
    .filter(t => t.type === "expense")
    .map(t => ({
      date: format(new Date(t.date), "MMM d"),
      amount: Number(t.amount)
    }))
    .slice(0, 7)
    .reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spend Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between mt-4">
          <button className="text-sm font-medium text-primary">Today</button>
          <button className="text-sm text-muted-foreground">Week</button>
          <button className="text-sm text-muted-foreground">Month</button>
          <button className="text-sm text-muted-foreground">Year</button>
        </div>
      </CardContent>
    </Card>
  );
}
