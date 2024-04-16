import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User_Vendor } from 'libs/constant/micro-services-names/micro-services-names.constant';
import { USER_VENDOR_TCP } from 'libs/constant/tcp/User-Vendor/UserVendor.tcp.constant';
import { firstValueFrom } from 'rxjs';

@Controller({
  version: '1',
  path: 'user-vendors',
})
export class UserVendorController {
  constructor(
    @Inject(User_Vendor.name)
    private readonly user_vendor_service: ClientProxy,
  ) {}

  @Post('register')
  async register() {
    const result = await firstValueFrom(
      this.user_vendor_service.send(
        {
          cmd: USER_VENDOR_TCP.USER_VENDOR_REGISTER,
        },
        '',
      ),
    );
    console.log('This is Result: ', result);
    return result;
  }
}
