import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/balance-card";
import SpendGraph from "@/components/spend-graph";
import TransactionList from "@/components/transaction-list";
import BottomNav from "@/components/bottom-nav";
import { type Transaction } from "@shared/schema";

export default function Home() {
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: balance, isLoading: balanceLoading } = useQuery<{
    balance: number;
    income: number;
    expenses: number;
  }>({
    queryKey: ["/api/balance"],
  });

  if (transactionsLoading || balanceLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
        <BalanceCard balance={balance!} />
        <SpendGraph transactions={transactions!} />
        <TransactionList transactions={transactions!} />
      </div>
      <BottomNav />
    </div>
  );
}
