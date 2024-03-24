import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';
import { ResponseMessage } from 'libs/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerAdminDocs } from '../docs/customer.admin.doc';
import { CustomerCreateDto } from '../dtos/customer.create.dto';

@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor(@Inject('CUSTOMER') private readonly client: ClientProxy) {}
  @CustomerAdminDocs()
  @ResponseMessage('Customer Created.')
  @Post('/create')
  async create(@Body() customerData: CustomerCreateDto) {
    const data = await firstValueFrom(
      this.client.send(
        { cmd: CUSTOMER_ADMIN_TCP.CUSTOMER_ADMIN_REGISTER },
        customerData,
      ),
    );

    return data;
  }
}
