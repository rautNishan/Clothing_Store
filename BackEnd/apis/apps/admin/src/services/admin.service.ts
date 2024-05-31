import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'libs/common/auth/services/auth.service';
import { BaseUserEntity } from 'libs/common/database/base-entity/base.user.entity';
import { StrictRpcException } from 'libs/common/error/strict-rpc-class/micro-service-error';
import { AdminRepository } from '../repository/admin.repository';
import { AdminEntity } from 'libs/common/entities/admin/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _authService: AuthService,
  ) {}

  async login(data: BaseUserEntity) {
    try {
      const existingAdmin: AdminEntity | null = await this._adminRepo.findOne({
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
      throw error;
    }
  }
}
