import { Module } from '@nestjs/common';
import { VendorModule } from './modules/vendors/vendor.module';
import { HostelModule } from './modules/hostels/hostel.module';
import { ConfigModule } from '@nestjs/config';
import vendorDatabaseConfig from '../src/config/vendor.database.config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from 'libs/database/services/database.providers';
import { DataSource, DataSourceOptions } from 'typeorm';
@Module({
  imports: [
    VendorModule,
    HostelModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [vendorDatabaseConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DATA_BASE_TYPE: Joi.string().required(),
        DATA_BASE_HOST_DEVELOPMENT: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
        DATA_BASE_USER: Joi.string().required(),
        DATA_BASE_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class UserVendorModule {}
