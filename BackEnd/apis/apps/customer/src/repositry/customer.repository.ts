import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/common/database/repository/base.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'libs/common/entities/customer/customer.entity';

@Injectable({})
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {
    super(customerRepository);
  }
}
