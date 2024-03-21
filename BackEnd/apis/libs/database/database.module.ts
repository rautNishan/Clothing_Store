import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import { DatabaseService } from './services/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [databaseConfig],
      isGlobal: false,
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
