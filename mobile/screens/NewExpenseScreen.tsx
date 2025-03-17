import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, IconButton, Text } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DocumentPickerResponse } from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'NewExpense'>;

export default function NewExpenseScreen({ navigation }: Props) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<DocumentPickerResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: {
      type: 'expense';
      amount: string;
      category: string;
      description: string;
      attachment?: File;
    }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'attachment' && value) {
          formData.append('attachment', {
            uri: value.uri,
            type: value.type,
            name: value.name,
          });
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await fetch('/api/transactions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/balance'] });
      navigation.goBack();
    },
  });

  const handleAttachment = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setAttachment(result[0]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleSubmit = () => {
    if (!category || !description || amount === '0') return;

    mutation.mutate({
      type: 'expense',
      amount,
      category,
      description,
      attachment: attachment as unknown as File,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text variant="titleLarge">New Expense</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Select category"
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="What was this expense for?"
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={handleAttachment}
          style={styles.attachmentButton}
        >
          {attachment ? attachment.name : 'Add attachment'}
        </Button>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={mutation.isPending}
          style={styles.submitButton}
        >
          {mutation.isPending ? 'Adding...' : 'Continue'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  attachmentButton: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: 'rgb(139, 92, 246)',
    paddingVertical: 8,
  },
});