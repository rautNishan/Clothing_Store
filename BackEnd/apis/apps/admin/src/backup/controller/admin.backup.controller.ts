import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { BackUpTablesDto, DatabaseNameDto } from '../dtos/backup.table.dto';
import { AdminBackUpService } from '../services/admin.backup.service';

@Controller('backup')
export class AdminBackUpController {
  constructor(private readonly _adminService: AdminBackUpService) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DATA_BASE_BACK_UP })
  async databaseBackUp(incomingData: DatabaseNameDto): Promise<string> {
    try {
      const { databaseName } = incomingData;
      const data: string =
        await this._adminService.databaseBackUp(databaseName);
      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DATA_BASE_TABLES_BACK_UP })
  async databaseTableBackUp(incomingData: BackUpTablesDto): Promise<string> {
    const { databaseName, tables } = incomingData;
    try {
      const data: string = await this._adminService.databaseTableBackUp(
        databaseName,
        tables,
      );
      return data;
    } catch (error) {
      throw new StrictRpcException(error);
    }
  }
}
