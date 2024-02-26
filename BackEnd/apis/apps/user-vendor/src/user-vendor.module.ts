import { Module } from '@nestjs/common';
import { UserVendorService } from './user-vendor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserVendorService],
})
export class UserVendorModule {}
