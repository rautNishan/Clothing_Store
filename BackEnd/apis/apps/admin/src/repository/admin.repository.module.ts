import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../entity/admin.entity';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminRepository],
  exports: [AdminRepository],
})
export class AdminRepositoryModule {}
