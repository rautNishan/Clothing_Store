import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/database/repository/base.repository';
import { CustomerEntity } from '../entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({})
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {
    super(customerRepository);
  }
}
