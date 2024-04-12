import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import {
  IPaginatedOptions,
  IPaginationResponse,
} from 'libs/database/interface/database.interface';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { DataSource, DeepPartial, QueryRunner } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerService } from '../services/customer.service';
import { ICustomerUpdate } from '../interfaces/customer.update.interface';

//These are all admin controls
@Controller('customer')
export class CustomerAdminController {
  constructor(
    private readonly _customerService: CustomerService,
    private readonly _dataSource: DataSource,
  ) {}

  @MessagePattern({ cmd: ADMIN_TCP.CUSTOMER_ADMIN_REGISTER })
  async create(
    customerData: DeepPartial<CustomerEntity>,
  ): Promise<CustomerEntity> {
    const queryRunner: QueryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const entityManager = queryRunner.manager;

    try {
      const data: CustomerEntity = await this._customerService.create(
        customerData,
        {
          entityManger: entityManager,
        },
      );
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new StrictRpcException(error);
    } finally {
      await queryRunner.release();
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.CUSTOMER_ADMIN_GET_ALL_CUSTOMERS })
  async list(
    options?: IPaginatedOptions<CustomerEntity>,
  ): Promise<IPaginationResponse<CustomerEntity>> {
    try {
      const { ...paginationOptions } = options;
      paginationOptions.searchableFields = ['userName', 'email'];
      const data =
        await this._customerService.findAllWithPagination(paginationOptions);
      console.log('This is Data: ', data);

      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.CUSTOMER_ADMIN_UPDATE_CUSTOMER_BY_ID })
  async update(incomingData: ICustomerUpdate): Promise<CustomerEntity> {
    const queryRunner: QueryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const entityManager = queryRunner.manager;
    try {
      //This is always true because there is strict type in ApiGate Way
      const { id, updateData } = incomingData;

      //First check if that there is existing customer with that id or not
      const existingCustomer: CustomerEntity | null =
        await this._customerService.findById(id);
      if (!existingCustomer) {
        throw new StrictRpcException({
          message: 'Customer with that id was not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      //Process to update
      const updatedData: CustomerEntity = await this._customerService.update(
        updateData,
        existingCustomer,
        { entityManger: entityManager },
      );

      await queryRunner.commitTransaction();

      return updatedData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('🚀 ~ CustomerAdminController ~ update ~ error:', error);
      throw new StrictRpcException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
