import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { USER_VENDOR } from 'libs/common/constant/micro-services-names/micro-services-names.constant';
import { ADMIN_TCP } from 'libs/common/constant/tcp/admin/admin.tcp.constant';
import { VendorCreateDto } from 'libs/common/dtos/vendor/vendor.create.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Vendor')
@Controller({
  path: 'vendor',
  version: '1',
})
export class VendorAdminController {
  constructor(
    @Inject(USER_VENDOR.name) private readonly vendorClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() incomingData: VendorCreateDto) {
    const data = await firstValueFrom(
      this.vendorClient.send(
        {
          cmd: ADMIN_TCP.VENDOR_ADMIN_REGISTER,
        },
        incomingData,
      ),
    );
    return { data };
  }
}
