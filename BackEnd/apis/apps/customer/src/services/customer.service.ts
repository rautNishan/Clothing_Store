import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositry/customer.repository';
import { DeepPartial } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import {
  ICreateOptions,
  IFindManyOptions,
  IFindOneOptions,
  IPaginatedOptions,
  IUpdateOptions,
} from 'libs/database/interface/database.interface';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(
    data: DeepPartial<CustomerEntity>, //todo Use Create DTO Only
    options?: ICreateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.create(data, options);
  }

  async findAll(
    options?: IFindManyOptions<CustomerEntity>,
  ): Promise<CustomerEntity[] | []> {
    return await this.customerRepository.findAll(options);
  }

  async findAllWithPagination(options?: IPaginatedOptions<CustomerEntity>) {
    return await this.customerRepository.findAllWithPagination(options);
  }

  async findOne(
    options?: IFindOneOptions<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    return await this.customerRepository.findOne(options);
  }

  async findById(
    id: number,
    options?: IFindOneOptions<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    return await this.customerRepository.findById(id, options);
  }

  async soft_delete(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.softDelete(repo, options);
  }

  async restore(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.restore(repo, options);
  }

  async hard_delete(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.softDelete(repo, options);
  }
}
