import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User_Vendor } from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { UserVendorController } from './modules/user-vendor/user-vendor.controller';

@Module({
  imports: [
    //Microservices
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
    ]),
    // ConfigModule.forRoot({
    //   envFilePath: ['.env'],
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     SECRET_KEY: Joi.string().required(),
    //   }),
    // }),
  ],
  controllers: [UserVendorController],
  providers: [],
})
export class AppModule {}
