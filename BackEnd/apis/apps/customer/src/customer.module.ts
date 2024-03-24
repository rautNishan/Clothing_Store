import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { CustomerAdminController } from './controller/customer.admin.controller';
import { CustomerRepositoryModule } from './repositry/customer.repositry.module';
import { CustomerService } from './services/customer.service';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';

@Module({
  imports: [DatabaseModule, CustomerRepositoryModule, MicroServiceErrorModule],
  controllers: [CustomerAdminController],
  providers: [CustomerService],
})
export class CustomerModule {}
