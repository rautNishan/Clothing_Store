import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ADMIN } from 'libs/common/constant/micro-services-names/micro-services-names.constant';
import { ADMIN_TCP } from 'libs/common/constant/tcp/admin/admin.tcp.constant';
import { ApiDoc } from 'libs/common/docs/decorators/doc.decorator';
import { firstValueFrom } from 'rxjs';
import { AdminLoginDto } from '../../../../../../libs/common/dtos/authentication/admin.login.dto';
import { FinalAdminSerialization } from '../serializations/admin.serialization';

@ApiTags('Authentication')
@Controller('auth')
export class AuthAdminController {
  constructor(@Inject(ADMIN.name) private readonly _adminClient: ClientProxy) {}

  @Post('/login')
  @ApiDoc({
    operation: 'Admin Login',
    serialization: FinalAdminSerialization,
    jwtAccessToken: false,
    defaultMessagePath: 'Login Success',
    defaultStatusCode: HttpStatus.OK,
  })
  async login(@Body() body: AdminLoginDto): Promise<any> {
    try {
      const token = await firstValueFrom(
        this._adminClient.send(
          {
            cmd: ADMIN_TCP.ADMIN_LOGIN,
          },
          body,
        ),
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
