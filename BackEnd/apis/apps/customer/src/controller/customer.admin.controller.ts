import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { IPaginatedOptions } from 'libs/database/interface/database.interface';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { DataSource, DeepPartial, QueryRunner } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerAdminController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly dataSource: DataSource,
  ) {}

  @MessagePattern({ cmd: ADMIN_TCP.CUSTOMER_ADMIN_REGISTER })
  async create(
    customerData: DeepPartial<CustomerEntity>,
  ): Promise<CustomerEntity> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const entityManager = queryRunner.manager;

    try {
      const data = await this.customerService.create(customerData, {
        entityManger: entityManager,
      });
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      console.log('🚀 ~ CustomerAdminController ~ error:', error);
      await queryRunner.rollbackTransaction();
      throw new StrictRpcException(error);
    } finally {
      await queryRunner.release();
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.CUSTOMER_ADMIN_GET_ALL_CUSTOMERS })
  async list(options?: IPaginatedOptions<CustomerEntity>) {
    try {
      const { ...paginationOptions } = options;
      paginationOptions.searchableFields = ['userName', 'email'];
      const data =
        await this.customerService.findAllWithPagination(paginationOptions);
      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }
}
