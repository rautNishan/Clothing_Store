import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/auth/decorators/user-protected-decorator';
import { Admin } from 'libs/constant/micro-services-names/micro-services-names.constant';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { ResponseMessage } from 'libs/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import { BackUpTablesDto, DatabaseName } from '../dtos/backup.dto';
import {
  AdminDataBaseBackUpSerialization,
  AdminDataBaseTableBackUpSerialization,
} from '../serializations/admin.serialization';

@ApiTags('Back Up')
@Controller('backup')
export class AdminBackUpController {
  constructor(@Inject(Admin.name) private readonly _adminClient: ClientProxy) {}

  @ApiDoc({
    operation: 'Admin Create DataBase BackUp',
    defaultStatusCode: 201,
    defaultMessagePath: 'Completed',
    serialization: AdminDataBaseBackUpSerialization,
  })
  @UserProtectedGuard()
  @ResponseMessage('Completed')
  @Post('/database')
  async databaseBackUp(@Body() databaseName: DatabaseName): Promise<string> {
    try {
      return await firstValueFrom(
        this._adminClient.send(
          { cmd: ADMIN_TCP.ADMIN_DATA_BASE_BACK_UP },
          databaseName,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiDoc({
    operation: 'Admin Create DataBase Tables BackUp',
    defaultStatusCode: 201,
    defaultMessagePath: 'Completed',
    serialization: AdminDataBaseTableBackUpSerialization,
  })
  @UserProtectedGuard()
  @ResponseMessage('Completed')
  @Post('/table')
  async databaseTableBackUp(
    @Body() incomingData: BackUpTablesDto,
  ): Promise<string> {
    try {
      console.log('Request Made');
      return await firstValueFrom(
        this._adminClient.send(
          { cmd: ADMIN_TCP.ADMIN_DATA_BASE_TABLES_BACK_UP },
          incomingData,
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
