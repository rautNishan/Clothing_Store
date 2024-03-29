import { Module } from '@nestjs/common';

import { AdminRepositoryModule } from './repository/admin.repository.module';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [DatabaseModule, AdminRepositoryModule],
})
export class AdminModule {}
