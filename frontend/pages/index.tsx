import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '../utils/format';
import BalanceCard from '../components/BalanceCard';
import SpendGraph from '../components/SpendGraph';
import TransactionList from '../components/TransactionList';
import BottomNav from '../components/BottomNav';
import type { Transaction } from '../types';

export default function Home() {
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
  });

  const { data: balance, isLoading: balanceLoading } = useQuery<{
    balance: number;
    expenses: number;
  }>({
    queryKey: ['/api/balance'],
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