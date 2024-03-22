import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CustomerEntity } from 'apps/customer/src/entity/customer.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database_name'),
      entities: [CustomerEntity], // This is not a good practice. Solving soon
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      synchronize: false,
      cli: {
        entitiesDir: 'src',
        // migrationsDir: 'src/database/migrations',
      },
    } as TypeOrmModuleOptions;
  }
}
