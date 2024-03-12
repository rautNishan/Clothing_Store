import { Module } from '@nestjs/common';
import { CustomerAdminController } from '../../modules/customer/controller/customer.admin.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  Customer,
  User_Vendor,
} from 'libs/constant/MicroServicesName/MicroServices-Names.constant';

@Module({
  imports: [
    ClientsModule.register([
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
  ],
  controllers: [CustomerAdminController],
})
export class AdminRouterModule {}
