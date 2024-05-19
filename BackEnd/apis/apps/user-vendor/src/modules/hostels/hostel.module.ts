import { Module } from '@nestjs/common';
import { HostelService } from './service/hostel.service';
import { HostelAdminController } from './controllers/hostel.admin.controller';
import { HostelVendorController } from './controllers/hostel.vendor.controller';
import { HostelCustomerController } from './controllers/hostel.customer.controller';

@Module({
  providers: [HostelService],
  controllers: [
    HostelAdminController,
    HostelVendorController,
    HostelCustomerController,
  ],
})
export class HostelModule {}
