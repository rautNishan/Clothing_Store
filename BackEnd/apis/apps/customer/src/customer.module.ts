import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'libs/auth/auth.module';
import { DatabaseModule } from 'libs/database/database.module';
import { DatabaseService } from 'libs/database/services/database.providers';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CustomerAdminController } from './controllers/customer.admin.controller';
import { CustomerController } from './controllers/customer.controller';
import { CustomerRepositoryModule } from './repositry/customer.repositry.module';
import { CustomerService } from './services/customer.service';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
@Module({
  imports: [
    DatabaseModule,
    CustomerRepositoryModule,
    MicroServiceErrorModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [databaseConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DATA_BASE_TYPE: Joi.string().required(),
        DATA_BASE_HOST_DEVELOPMENT: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
        DATA_BASE_USER: Joi.string().required(),
        DATA_BASE_PASSWORD: Joi.string().required(),
        // DATA_BASE_NAME: Joi.string().required(),
      }),
    }),
    //Database Options
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [CustomerController, CustomerAdminController],
  providers: [CustomerService],
})
export class CustomerModule {}
