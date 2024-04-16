import { Module } from '@nestjs/common';
import { AdminBackUpController } from './controller/admin.backup.controller';
import { AdminBackUpService } from './services/admin.backup.service';

@Module({
  controllers: [AdminBackUpController], //Make sure it is imported from correct app
  providers: [AdminBackUpService],
  exports: [AdminBackUpService],
})
export class AdminBackUpModule {}
