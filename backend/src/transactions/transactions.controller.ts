import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction, CreateTransactionDto } from './transaction.interface';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(): Promise<Transaction[]> {
    return this.transactionsService.getAll();
  }

  @Post()
  async create(@Body() data: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.create(data);
  }

  @Get('balance')
  async getBalance() {
    return this.transactionsService.getBalance();
  }
}
