import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import { DatabaseService } from './services/database.providers';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
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
        DATA_BASE_NAME: Joi.string().required(),
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
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  private readonly logger = new Logger(DatabaseModule.name);
  constructor() {
    this.logger.log('Database connected successfully');
  }
}
