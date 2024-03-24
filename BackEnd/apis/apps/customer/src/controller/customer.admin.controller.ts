import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';
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

  @MessagePattern({ cmd: CUSTOMER_ADMIN_TCP.CUSTOMER_ADMIN_REGISTER })
  async create(data: DeepPartial<CustomerEntity>) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const entityManager = queryRunner.manager;

    try {
      const customerData = await this.customerService.create(data, {
        entityManger: entityManager,
      });
      await queryRunner.commitTransaction();

      return customerData;
    } catch (error) {
      throw new StrictRpcException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
