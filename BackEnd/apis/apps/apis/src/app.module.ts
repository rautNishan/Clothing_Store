import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppRouterModule } from './router/router.module';
@Module({
  imports: [
    // ClientsModule.register([
    //   //UserVendor
    //   {
    //     name: User_Vendor.name,
    //     transport: Transport.TCP,
    //     options: {
    //       host: User_Vendor.host,
    //       port: User_Vendor.port,
    //     },
    //   },
    //   {
    //     name: Customer.name,
    //     transport: Transport.TCP,
    //     options: {
    //       host: Customer.host,
    //       port: Customer.port,
    //     },
    //   },
    // ]),
    //Validating Environment Variables
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        DATA_BASE_TYPE: Joi.string().required(),
        DATA_BASE_HOST_DEVELOPMENT: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
        DATA_BASE_USER: Joi.string().required(),
        DATA_BASE_PASSWORD: Joi.string().required(),
        // DATA_BASE_NAME: Joi.string().required(),
        MICRO_SERVICE_USER_VENDOR_SERVICE_PORT: Joi.number().required(),
        MICRO_SERVICE_CUSTOMER_SERVICE_PORT: Joi.number().required(),
      }),
    }),
    //Router
    AppRouterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
