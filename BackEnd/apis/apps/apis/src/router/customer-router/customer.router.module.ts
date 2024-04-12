import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'libs/auth/auth.module';
import { Customer } from 'libs/constant/micro-services-names/micro-services-names.constant';
import { DebuggerLoggerModule } from 'libs/debugger/debugger.logger.module';
import { DebuggerModule } from 'libs/debugger/debugger.module';
import { ExceptionFilterModule } from 'libs/error/error.http.module';
import { ResponseModule } from 'libs/response/response.module';
import { AuthCustomerController } from '../../modules/authentication/contollers/auth.customer.controller';

@Module({
  imports: [
    ClientsModule.register([
      //Admin
      //   {
      //     name: Admin.name,
      //     transport: Transport.TCP,
      //     options: {
      //       host: Admin.host || 'localhost',
      //       port: Admin.port || 5000,
      //     },
      //   },
      //   //   UserVendor
      //   {
      //     name: User_Vendor.name,
      //     transport: Transport.TCP,
      //     options: {
      //       host: User_Vendor.host,
      //       port: User_Vendor.port,
      //     },
      //   },
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
    AuthModule,
  ],
  controllers: [AuthCustomerController],
})
export class CustomerRouterModule {}
