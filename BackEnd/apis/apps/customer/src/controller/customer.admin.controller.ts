import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';

@Controller('customer')
export class CustomerAdminController {
  constructor() {}

  @MessagePattern({ cmd: CUSTOMER_ADMIN_TCP.CUSTOMER_ADMIN_REGISTER })
  async create(data: Record<any, string>) {
    console.log('This is Result in Service', data);
  }
}
