import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';
import { firstValueFrom } from 'rxjs';
import { CustomerAdminDocs } from '../docs/customer.admin.doc';
@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor(@Inject('CUSTOMER') private readonly client: ClientProxy) {}
  @CustomerAdminDocs()
  @Post('/create')
  async create() {
    const data = {
      name: 'Customer',
      email: 'donnishan0@gmail.com',
    };
    console.log('This is Data', data);
    const result = await firstValueFrom(
      this.client.send(
        { cmd: CUSTOMER_ADMIN_TCP.CUSTOMER_ADMIN_REGISTER },
        data,
      ),
    );
    console.log('This is Result', result);
    return result;
  }
}
