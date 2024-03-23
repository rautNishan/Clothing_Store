import { HttpStatus, Injectable } from '@nestjs/common';
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
import { RpcException } from '@nestjs/microservices';

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
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'User Name Exists.',
        });
      }
    }
    if (data.email) {
      const existingEmail = await this.findOne({
        findOneOptions: {
          where: { email: data.email },
        },
      });
      if (existingEmail) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Email Exists.',
        });
      }
    }
    if (data.contact) {
      const existingContact = await this.findOne({
        findOneOptions: {
          where: { contact: data.contact },
        },
      });
      if (existingContact?.contact) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Contact Exists.',
        });
      }
    }

    //Hash Password and Save
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
