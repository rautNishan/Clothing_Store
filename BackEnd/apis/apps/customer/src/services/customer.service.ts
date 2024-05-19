import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomerLoginDto } from 'apps/apis/src/modules/authentication/dtos/customer.login.dto';
import { AuthService } from 'libs/auth/services/auth.service';
import { ROLES } from 'libs/database/constants/base.roles.enum';
import {
  ICreateOptions,
  IFindManyOptions,
  IFindOneOptions,
  IPaginatedOptions,
  IPaginationResponse,
  IUpdateOptions,
} from 'libs/database/interface/database.interface';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { DeepPartial } from 'typeorm';
import { CustomerRepository } from '../repositry/customer.repository';
import * as bcrypt from 'bcrypt';
import { CustomerEntity } from 'libs/entities/customer/customer.entity';
@Injectable()
export class CustomerService {
  constructor(
    private readonly _customerRepository: CustomerRepository,
    private readonly authService: AuthService,
  ) {}

  async login(incomingData: CustomerLoginDto) {
    let existingCustomer: CustomerEntity | null = null;

    //Check if user is trying to login with username
    if (incomingData.userName) {
      existingCustomer = await this._customerRepository.findOne({
        findOneOptions: { where: { userName: incomingData.userName } },
      });
      if (!existingCustomer) {
        console.log('There is not existingCustomer: ', existingCustomer);
        throw new StrictRpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User name or password did not match',
        });
      }
    }

    //Check if user is trying to login with email
    if (incomingData.email) {
      existingCustomer = await this._customerRepository.findOne({
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

    const token: string = await this.authService.checkAuthentication(
      incomingData,
      existingCustomer,
    );
    return token;
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
    data.deletedAt = null;
    data.password = await bcrypt.hash(data.password, 10);

    //Hash Password and Save
    return await this._customerRepository.create(data, options);
  }

  async update(
    updateDto: DeepPartial<CustomerEntity>,
    repo: DeepPartial<CustomerEntity>,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    Object.assign(repo, updateDto);
    if (updateDto.password) {
      //If there is password in update make sure to hash and save
      repo.password = await bcrypt.hash(repo.password, 10);
    }

    const updatedData: CustomerEntity = await this._customerRepository.update(
      repo,
      options,
    );
    return updatedData;
  }

  async findAll(
    options?: IFindManyOptions<CustomerEntity>,
  ): Promise<CustomerEntity[] | []> {
    return await this._customerRepository.findAll(options);
  }

  async findAllWithPagination(
    options?: IPaginatedOptions<CustomerEntity>,
  ): Promise<IPaginationResponse<CustomerEntity>> {
    return await this._customerRepository.findAllWithPagination(options);
  }

  async findOne(
    options?: IFindOneOptions<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    return await this._customerRepository.findOne(options);
  }

  async findById(
    id: number,
    options?: IFindOneOptions<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    return await this._customerRepository.findById(id, options);
  }

  async soft_delete(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this._customerRepository.softDelete(repo, options);
  }

  async restore(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this._customerRepository.restore(repo, options);
  }

  async hard_delete(
    repo: CustomerEntity,
    options?: IUpdateOptions<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return await this._customerRepository.softDelete(repo, options);
  }
}
