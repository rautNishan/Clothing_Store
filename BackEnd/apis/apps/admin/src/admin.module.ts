import { Module } from '@nestjs/common';

import { AdminRepositoryModule } from './repository/admin.repository.module';
import { DatabaseModule } from 'libs/database/database.module';
import { AdminController } from './controller/admin.controller';
import { AuthModule } from 'libs/auth/auth.module';
import { AdminService } from './services/admin.service';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';

@Module({
  imports: [
    DatabaseModule,
    AdminRepositoryModule,
    AuthModule,
    MicroServiceErrorModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
