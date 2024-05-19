import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from 'libs/entities/vendor/vendor.entity';
import { VendorRepository } from './vendor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VendorEntity])],
  exports: [VendorRepository],
  providers: [VendorRepository],
})
export class VendorRepositoryModule {}
