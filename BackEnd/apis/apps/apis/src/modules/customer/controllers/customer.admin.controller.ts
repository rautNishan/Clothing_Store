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
import { UserProtectedGuard } from 'libs/auth/decorators/user-protected-decorator';
import { Customer } from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { PaginationQueryDto } from 'libs/docs/query/paginationQuery.dto';
import { ResponseDataDecorator } from 'libs/response/decorators/response.data.decorator';
import { ResponseMessage } from 'libs/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerCreateDto } from '../dtos/customer.create.dto';
import {
  FinalCustomerPaginationSerialization,
  FinalCustomerSerialization,
} from '../serializations/customer.serialization';

@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor(@Inject(Customer.name) private readonly client: ClientProxy) {}

  @ApiDoc({
    summary: 'Admin Create a new customer',
    defaultStatusCode: HttpStatus.CREATED,
    serialization: FinalCustomerSerialization,
    defaultMessagePath: 'Successfully Created',
  })
  @ResponseDataDecorator()
  @ResponseMessage('Customer Created.')
  @UserProtectedGuard()
  @Post('/create')
  async create(@Body() customerData: CustomerCreateDto) {
    try {
      const data = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.CUSTOMER_ADMIN_REGISTER },
          customerData,
        ),
      );
      return data;
    } catch (error) {
      console.log('🚀 ~ CustomerAdminController ~ create ~ error:', error);
      throw error;
    }
  }

  @ApiDoc({
    summary: 'Get Customer List',
    jwtAccessToken: true,
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
          cmd: ADMIN_TCP.CUSTOMER_ADMIN_GET_ALL_CUSTOMERS,
        },
        paginationQuery,
      ),
    );
    return data;
  }
}
