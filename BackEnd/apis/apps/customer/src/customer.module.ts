import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { CustomerAdminController } from './controller/customer.admin.controller';
import { CustomerRepositoryModule } from './repositry/customer.repositry.module';
import { CustomerService } from './services/customer.service';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';
import { AuthModule } from 'libs/auth/auth.module';
import { CustomerController } from './controller/customer.controller';

@Module({
  imports: [
    DatabaseModule,
    CustomerRepositoryModule,
    MicroServiceErrorModule,
    AuthModule,
  ],
  controllers: [CustomerController, CustomerAdminController],
  providers: [CustomerService],
})
export class CustomerModule {}
