import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { CustomerService } from './services/customer.service';
import { CustomerAdminController } from './controller/customer.admin.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerAdminController],
  providers: [CustomerService],
})
export class CustomerModule {}
