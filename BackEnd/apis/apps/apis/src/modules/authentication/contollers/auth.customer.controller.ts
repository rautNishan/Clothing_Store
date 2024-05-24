import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CUSTOMER } from 'libs/constant/micro-services-names/micro-services-names.constant';
import { CUSTOMER_TCP } from 'libs/constant/tcp/customer/customer.tcp.constant';
import { ApiDoc } from 'libs/docs/decorators/doc.decorator';
import { firstValueFrom } from 'rxjs';
import { CustomerLoginDto } from '../dtos/customer.login.dto';
import { FinalCustomerSerialization } from '../serializations/customer.serialization';

@ApiTags('Authentication')
@Controller('auth')
export class AuthCustomerController {
  constructor(
    @Inject(CUSTOMER.name) private readonly _customerClient: ClientProxy,
  ) {}

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
      console.log('This is Incoming Data: ', incomingData);
      const token = await firstValueFrom(
        this._customerClient.send(
          { cmd: CUSTOMER_TCP.CUSTOMER_LOGIN },
          incomingData,
        ),
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }

  // @GoogleProtected()
  // @Get('/google/login')
  // async loginWithGoogle() {
  //   console.log('Request is Made');
  //   return 'google';
  // }

  // @GoogleProtected()
  // @Get('/google/redirect')
  // async handleRedirect() {
  //   console.log('Handle Redirect Method is Being Called');
  //   return 'hulk is on google register';
  // }
}
