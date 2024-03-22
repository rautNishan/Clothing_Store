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
    if (data.userName) {
      const existingCustomer = await this.findOne({
        findOneOptions: {
          where: { userName: data.userName },
        },
      });
      if (existingCustomer) {
        throw new Error('User Name Exists');
      }
    }
    if (data.email) {
      const existingEmail = await this.findOne({
        findOneOptions: {
          where: { email: data.email },
        },
      });
      if (existingEmail) {
        throw new Error('Email Exists.');
      }
    }
    if (data.contact) {
      const existingContact = await this.findOne({
        findOneOptions: {
          where: { contact: data.contact },
        },
      });
      if (existingContact?.contact) {
        throw new Error('Contact Exists.');
      }
    }
    return await this.customerRepository.create(data, options);
    if (data.email) return await this.customerRepository.create(data, options);
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
