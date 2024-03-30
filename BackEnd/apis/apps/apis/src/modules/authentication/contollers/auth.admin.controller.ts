import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ADMIN_TCP } from 'libs/constant/tcp/admin/admin.tcp.constant';
import { firstValueFrom } from 'rxjs';
import { AdminLoginDto } from '../dtos/admin.login.dto';
import { Admin } from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { FinalAdminSerialization } from '../serializations/admin.serialization';

@ApiTags('Authentication')
@Controller('auth')
export class AuthAdminController {
  constructor(@Inject(Admin.name) private readonly client: ClientProxy) {}

  @Post('/login')
  @ApiDoc({
    operation: 'Admin Login',
    serialization: FinalAdminSerialization,
    defaultMessagePath: 'Login Success',
    defaultStatusCode: HttpStatus.OK,
  })
  async login(@Body() body: AdminLoginDto): Promise<any> {
    try {
      const token = await firstValueFrom(
        this.client.send(
          {
            cmd: ADMIN_TCP.ADMIN_LOGIN,
          },
          body,
        ),
      );
      return { token };
    } catch (error) {
      console.log('This is Error: ', error);

      throw error;
    }
  }
}
