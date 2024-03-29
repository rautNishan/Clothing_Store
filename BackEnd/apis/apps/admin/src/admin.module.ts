import { Module } from '@nestjs/common';

import { AdminRepositoryModule } from './repository/admin.repository.module';

@Module({
  imports: [AdminRepositoryModule],
})
export class AdminModule {}
