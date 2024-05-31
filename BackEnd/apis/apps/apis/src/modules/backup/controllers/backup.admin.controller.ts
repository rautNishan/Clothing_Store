import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/common/auth/decorators/user-protected-decorator';
import { ADMIN } from 'libs/common/constant/micro-services-names/micro-services-names.constant';
import { ADMIN_TCP } from 'libs/common/constant/tcp/admin/admin.tcp.constant';
import { ApiDoc } from 'libs/common/docs/decorators/doc.decorator';

import { ResponseMessage } from 'libs/common/response/decorators/response.message.decorator';
import { firstValueFrom } from 'rxjs';
import {
  AdminDataBaseBackUpSerialization,
  AdminDataBaseTableBackUpSerialization,
} from '../serializations/admin.serialization';
import {
  BackUpTablesDto,
  DatabaseName,
} from 'libs/common/dtos/backups/backup.dto';

@ApiTags('Back Up')
@Controller('backup')
export class AdminBackUpController {
  constructor(@Inject(ADMIN.name) private readonly _adminClient: ClientProxy) {}

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
