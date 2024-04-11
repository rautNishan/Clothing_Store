import { Controller } from '@nestjs/common';
import { AdminBackUpService } from '../services/admin.backup.service';
import { MessagePattern } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { BackUpTablesDto } from '../dtos/backup.table.dto';

@Controller('backup')
export class AdminBackUpController {
  constructor(private readonly _adminService: AdminBackUpService) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DATA_BASE_BACK_UP })
  async databaseBackUp(): Promise<string> {
    try {
      const data: string = await this._adminService.databaseBackUp();
      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DATA_BASE_TABLES_BACK_UP })
  async databaseTableBackUp(incomingTables: BackUpTablesDto): Promise<string> {
    try {
      console.log('Request has been made in table backup');

      const data: string =
        await this._adminService.databaseTableBackUp(incomingTables);
      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }
}
