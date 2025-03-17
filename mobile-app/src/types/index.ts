export interface Transaction {
  id: number;
  type: 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  attachment?: string;
}

export interface Balance {
  balance: number;
  expenses: number;
}

export type RootStackParamList = {
  Home: undefined;
  NewExpense: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
