import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';
import { DeepPartial, DataSource, QueryRunner } from 'typeorm';
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
    console.log('This is Data', data);
    const entityManager = queryRunner.manager;

    try {
      const customerData = await this.customerService.create(data, {
        entityManger: entityManager,
      });
      await queryRunner.commitTransaction();
      return customerData;
    } catch (error) {
      throw new RpcException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
