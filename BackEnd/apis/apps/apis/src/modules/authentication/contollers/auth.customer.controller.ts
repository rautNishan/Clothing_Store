import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { GoogleProtected } from 'libs/auth/decorators/user-google.decorator';
import { Customer } from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { CUSTOMER_TCP } from 'libs/constant/tcp/Customer/customer.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerLoginDto } from '../dtos/customer.login.dto';
import { FinalCustomerSerialization } from '../serializations/customer.serialization';

@ApiTags('Authentication')
@Controller('auth')
export class AuthCustomerController {
  constructor(@Inject(Customer.name) private readonly client: ClientProxy) {}

  @Post('/login')
  @ApiDoc({
    operation: 'Customer Login',
    serialization: FinalCustomerSerialization,
    jwtAccessToken: false,
    defaultMessagePath: 'Login Success',
    defaultStatusCode: HttpStatus.OK,
  })
  async login(@Body() incomingData: CustomerLoginDto): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.client.send({ cmd: CUSTOMER_TCP.CUSTOMER_LOGIN }, incomingData),
      );
      return { data };
    } catch (error) {
      console.log('🚀 ~ AuthCustomerController ~ login ~ error:', error);
      throw error;
    }
  }

  @Get('/login/google')
  @GoogleProtected()
  async loginWithGoogle() {
    return 'google';
  }

  @Get('/google/')
  @GoogleProtected()
  async redirectAfterGoogleLogin() {
    console.log('Request is made in /google/');
    return 'ok';
  }
}
