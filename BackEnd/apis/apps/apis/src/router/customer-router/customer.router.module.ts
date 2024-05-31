import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'libs/common/auth/auth.module';
import { CUSTOMER } from 'libs/common/constant/micro-services-names/micro-services-names.constant';
import { DebuggerLoggerModule } from 'libs/common/debugger/debugger.logger.module';
import { DebuggerModule } from 'libs/common/debugger/debugger.module';
import { ExceptionFilterModule } from 'libs/common/error/error.http.module';
import { ResponseModule } from 'libs/common/response/response.module';
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
        name: CUSTOMER.name,
        transport: Transport.TCP,
        options: {
          host: CUSTOMER.host || 'localhost',
          port: CUSTOMER.port || 5001,
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
