import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { BaseUserEntity } from 'libs/database/base-entity/base.user.entity';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}
  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_LOGIN })
  async login(incomingData: BaseUserEntity) {
    try {
      const data = await this._adminService.login(incomingData);
      return data;
    } catch (error) {
      console.log('🚀 ~ AdminController ~ login ~ error:', error);
      throw new StrictRpcException(error);
    }
  }
}
