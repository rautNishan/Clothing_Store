import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/auth/decorators/user-protected-decorator';
import { CUSTOMER } from 'libs/constant/micro-services-names/micro-services-names.constant';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { PaginationQueryDto } from 'libs/docs/query/paginationQuery.dto';
import { UseParamGuard } from 'libs/request/decorators/param.guard.decorator';
import { ResponseDataDecorator } from 'libs/response/decorators/response.data.decorator';
import { ResponseMessage } from 'libs/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerCreateDto } from '../dtos/customer.create.dto';
import { CustomerUpdateDto } from '../dtos/customer.update.dto';
import { ICustomerUpdate } from '../interface/customer.update.interface';
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
  constructor(
    @Inject(CUSTOMER.name) private readonly _adminClient: ClientProxy,
  ) {}

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
        this._adminClient.send(
          { cmd: ADMIN_TCP.CUSTOMER_ADMIN_REGISTER },
          customerData,
        ),
      );
      return data;
    } catch (error) {
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
  @UserProtectedGuard()
  @Get('/list')
  async list(@Query() paginationQuery: PaginationQueryDto) {
    try {
      const data = await firstValueFrom(
        this._adminClient.send(
          {
            cmd: ADMIN_TCP.CUSTOMER_ADMIN_GET_ALL_CUSTOMERS,
          },
          paginationQuery,
        ),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Get('info/:id')
  @ApiDoc({
    operation: 'Get Customer By Id',
    serialization: FinalCustomerSerialization,
    defaultMessagePath: 'Successfully get by id',
    defaultStatusCode: HttpStatus.OK,
    params: [
      {
        type: 'string',
        name: 'id',
        required: true,
      },
    ],
  })
  @UseParamGuard()
  @UserProtectedGuard()
  async getById(@Param('id') id: number) {
    try {
      await firstValueFrom(
        this._adminClient.send(
          {
            cmd: ADMIN_TCP.CUSTOMER_ADMIN_GET_BY_ID,
          },
          id,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiDoc({
    operation: 'Update User By Id',
    params: [
      {
        type: 'number',
        name: 'id',
        required: true,
      },
    ],
    serialization: FinalCustomerSerialization,
    defaultStatusCode: HttpStatus.OK,
    defaultMessagePath: 'Update Success',
  })
  @ResponseMessage('Updated Successfully')
  @ResponseDataDecorator()
  @UseParamGuard()
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateData: CustomerUpdateDto) {
    try {
      //Always Make it Strict
      const dataToSend: ICustomerUpdate = {
        id: id,
        updateData: updateData,
      };

      const data = firstValueFrom(
        this._adminClient.send(
          { cmd: ADMIN_TCP.CUSTOMER_ADMIN_UPDATE_CUSTOMER_BY_ID },
          dataToSend,
        ),
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}
