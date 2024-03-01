import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [CustomerService],
})
export class CustomerModule {}
