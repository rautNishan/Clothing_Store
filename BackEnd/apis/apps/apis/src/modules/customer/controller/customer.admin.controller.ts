import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CUSTOMER_ADMIN_TCP } from 'libs/constant/tcp/Customer/customer.admin.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { ResponseDataDecorator } from 'libs/response/decorators/response.data.decorator';
import { ResponseMessage } from 'libs/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerCreateDto } from '../dtos/customer.create.dto';
import {
  FinalCustomerPaginationSerialization,
  FinalCustomerSerialization,
} from '../serializations/customer.serialization';
import { PaginationQueryDto } from 'libs/docs/query/paginationQuery.dto';

@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor(@Inject('CUSTOMER') private readonly client: ClientProxy) {}
  @ApiDoc({
    summary: 'Admin Create a new customer',
    jwtAccessToken: false,
    defaultStatusCode: HttpStatus.CREATED,
    serialization: FinalCustomerSerialization,
    defaultMessagePath: 'Successfully Created',
  })
  @ResponseDataDecorator()
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

  @ApiDoc({
    summary: 'Get Customer List',
    jwtAccessToken: false,
    defaultStatusCode: HttpStatus.OK,
    serialization: FinalCustomerPaginationSerialization,
    defaultMessagePath: 'Successfully Listed Customer List',
  })
  @ResponseMessage('Customer Lists.')
  @Get('/list')
  async list(@Query() paginationQuery: PaginationQueryDto) {
    const data = await firstValueFrom(
      this.client.send(
        {
          cmd: CUSTOMER_ADMIN_TCP.CUSTOMER_ADMIN_GET_ALL_CUSTOMERS,
        },
        paginationQuery,
      ),
    );
    return data;
  }
}
