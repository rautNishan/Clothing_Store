import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomerService],
})
export class CustomerModule {}
