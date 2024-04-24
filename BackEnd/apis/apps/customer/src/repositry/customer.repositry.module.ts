import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerEntity } from 'libs/entities/customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  exports: [CustomerRepository],
  providers: [CustomerRepository],
})
export class CustomerRepositoryModule {}
