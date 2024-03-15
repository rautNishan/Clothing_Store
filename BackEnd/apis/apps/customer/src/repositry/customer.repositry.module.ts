import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  exports: [CustomerRepository],
  providers: [CustomerRepository],
})
export class CustomerRepositoryModule {}
