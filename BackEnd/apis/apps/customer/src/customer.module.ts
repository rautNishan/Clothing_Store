import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { CustomerAdminController } from './controller/customer.admin.controller';
import { CustomerRepositoryModule } from './repositry/customer.repositry.module';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [DatabaseModule, CustomerRepositoryModule],
  controllers: [CustomerAdminController],
  providers: [CustomerService],
})
export class CustomerModule {}
