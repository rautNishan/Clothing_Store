import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomerLoginDto } from 'apps/apis/src/modules/authentication/dtos/customer.login.dto';
import { AuthService } from 'libs/auth/services/auth.service';
import { ROLES } from 'libs/database/constants/base.roles.enum';
import {
  ICreateOptions,
  IFindManyOptions,
  IFindOneOptions,
  IPaginatedOptions,
  IUpdateOptions,
} from 'libs/database/interface/database.interface';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { DeepPartial } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepository } from '../repositry/customer.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly authService: AuthService,
  ) {}

  async login(incomingData: CustomerLoginDto) {
    let existingCustomer: CustomerEntity | null = null;
    if (incomingData.userName) {
      existingCustomer = await this.customerRepository.findOne({
        findOneOptions: { where: { userName: incomingData.userName } },
      });
      if (!existingCustomer) {
        throw new StrictRpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User name or password did not match',
        });
      }
    }
    if (incomingData.email) {
      existingCustomer = await this.customerRepository.findOne({
        findOneOptions: { where: { email: incomingData.email } },
      });
      if (!existingCustomer) {
        throw new StrictRpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Email or password did not match',
        });
      }
    }
    //todo login with contact

    const isAuthenticated: string = await this.authService.checkAuthentication(
      incomingData,
      existingCustomer,
    );
    if (!isAuthenticated) {
      throw new StrictRpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Email or password did not match',
      });
    }
    return isAuthenticated;
  }
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
        throw new StrictRpcException({
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
        throw new StrictRpcException({
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
        throw new StrictRpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Contact Exists.',
        });
      }
    }

    data.role = ROLES.CUSTOMER;
    data.password = await bcrypt.hash(data.password, 10);
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
