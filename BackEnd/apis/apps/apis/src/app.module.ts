import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User_Vendor } from 'libs/constant/MicroServicesName/MicroServices-Names.constant';
import { AppRouterModule } from './router/router.module';

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

    //Router
    AppRouterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
