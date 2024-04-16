import { Module } from '@nestjs/common';

import { AuthModule } from 'libs/auth/auth.module';
import { DatabaseModule } from 'libs/database/database.module';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';
import { AdminBackUpModule } from './backup/admin.backup.module';
import { AdminController } from './controller/admin.controller';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    AdminBackUpModule,
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
