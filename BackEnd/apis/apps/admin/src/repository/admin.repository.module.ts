import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminRepository } from './admin.repository';
import { AdminEntity } from 'libs/common/entities/admin/admin.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminRepository],
  exports: [AdminRepository],
})
export class AdminRepositoryModule {}
