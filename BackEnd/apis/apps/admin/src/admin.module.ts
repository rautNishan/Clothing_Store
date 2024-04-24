import { Module } from '@nestjs/common';

import { AuthModule } from 'libs/auth/auth.module';
import { DatabaseModule } from 'libs/database/database.module';
import { MicroServiceErrorModule } from 'libs/error/error.micro-services.module';
import { AdminBackUpModule } from './backup/admin.backup.module';
import { AdminController } from './controller/admin.controller';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AdminService } from './services/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'libs/database/services/database.providers';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';

@Module({
  imports: [
    AdminBackUpModule,
    DatabaseModule,
    AdminRepositoryModule,
    AuthModule,
    MicroServiceErrorModule,
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
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
