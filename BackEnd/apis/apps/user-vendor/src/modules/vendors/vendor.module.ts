import { Module } from '@nestjs/common';
import { VendorAdminController } from './controllers/vendors.admin.controller';
import { VendorController } from './controllers/vendors.controller';
import { VendorService } from './service/vendor.service';
import { VendorRepositoryModule } from './repository/vendor.repository.module';

@Module({
  imports: [VendorRepositoryModule],
  providers: [VendorService],
  controllers: [VendorController, VendorAdminController],
})
export class VendorModule {}
