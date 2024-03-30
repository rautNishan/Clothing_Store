import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  Admin,
  Customer,
  User_Vendor,
} from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { DebuggerLoggerModule } from 'libs/debugger/debugger.logger.module';
import { DebuggerModule } from 'libs/debugger/debugger.module';
import { CustomerAdminController } from '../../modules/customer/controllers/customer.admin.controller';
import { ExceptionFilterModule } from 'libs/error/error.http.module';
import { ResponseModule } from 'libs/response/response.module';
import { AuthAdminController } from '../../modules/authentication/contollers/auth.admin.controller';

@Module({
  imports: [
    ClientsModule.register([
      //Admin
      {
        name: Admin.name,
        transport: Transport.TCP,
        options: {
          host: Admin.host || 'localhost',
          port: Admin.port || 5000,
        },
      },
      //UserVendor
      {
        name: User_Vendor.name,
        transport: Transport.TCP,
        options: {
          host: User_Vendor.host,
          port: User_Vendor.port,
        },
      },
      {
        name: Customer.name,
        transport: Transport.TCP,
        options: {
          host: Customer.host || 'localhost',
          port: Customer.port || 5001,
        },
      },
    ]),
    DebuggerLoggerModule,
    DebuggerModule,
    ExceptionFilterModule,
    ResponseModule,
  ],
  controllers: [AuthAdminController, CustomerAdminController],
})
export class AdminRouterModule {}
