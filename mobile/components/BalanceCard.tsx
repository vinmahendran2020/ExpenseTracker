import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { formatCurrency } from '../utils/format';

export default function BalanceCard({ balance }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">Account Balance</Text>
      </View>

      <Text style={styles.balance}>{formatCurrency(balance.balance)}</Text>

      <Card style={styles.expenseCard}>
        <Card.Content>
          <Text style={styles.expenseLabel}>Total Expenses</Text>
          <Text style={styles.expenseAmount}>
            {formatCurrency(balance.expenses)}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  expenseCard: {
    backgroundColor: '#FEF2F2',
  },
  expenseLabel: {
    color: '#DC2626',
    fontWeight: '500',
    marginBottom: 4,
  },
  expenseAmount: {
    color: '#B91C1C',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
