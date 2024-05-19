import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { USER_VENDOR_TCP } from 'libs/constant/tcp/User-Vendor/UserVendor.tcp.constant';

@Controller('user-information')
export class VendorController {
  constructor() {}

  @MessagePattern({ cmd: USER_VENDOR_TCP.USER_VENDOR_REGISTER })
  async register() {
    return 'This is User Information Register';
  }
}
