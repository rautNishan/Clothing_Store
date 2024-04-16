import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'libs/auth/services/auth.service';
import { BaseUserEntity } from 'libs/database/entity/base.user.entity';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _authService: AuthService,
  ) {}

  async login(data: BaseUserEntity) {
    try {
      const existingAdmin = await this._adminRepo.findOne({
        findOneOptions: { where: { userName: data.userName } },
      });
      if (!existingAdmin) {
        throw new StrictRpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User name or password did not match',
        });
      }

      return await this._authService.checkAuthentication(data, existingAdmin);
    } catch (error) {
      console.log('🚀 ~ AdminService ~ login ~ error:', error);
      throw new StrictRpcException(error);
    }
  }
}
