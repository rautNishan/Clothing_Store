import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'libs/common/auth/auth.module';
import {
  ADMIN,
  CUSTOMER,
  USER_VENDOR,
} from 'libs/common/constant/micro-services-names/micro-services-names.constant';
import { DebuggerLoggerModule } from 'libs/common/debugger/debugger.logger.module';
import { DebuggerModule } from 'libs/common/debugger/debugger.module';
import { ExceptionFilterModule } from 'libs/common/error/error.http.module';
import { ResponseModule } from 'libs/common/response/response.module';
import { AuthAdminController } from '../../modules/authentication/contollers/auth.admin.controller';
import { AdminBackUpController } from '../../modules/backup/controllers/backup.admin.controller';
import { CustomerAdminController } from '../../modules/customer/controllers/customer.admin.controller';
import { VendorAdminController } from '../../modules/vendor/controllers/vendor.admin.controller';

@Module({
  imports: [
    ClientsModule.register([
      //Admin
      {
        name: ADMIN.name,
        transport: Transport.TCP,
        options: {
          host: ADMIN.host || 'localhost',
          port: ADMIN.port || 5000,
        },
      },
      //UserVendor
      {
        name: USER_VENDOR.name,
        transport: Transport.TCP,
        options: {
          host: USER_VENDOR.host,
          port: USER_VENDOR.port,
        },
      },
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
  controllers: [
    AuthAdminController,
    CustomerAdminController,
    AdminBackUpController,
    VendorAdminController,
  ],
})
export class AdminRouterModule {}
