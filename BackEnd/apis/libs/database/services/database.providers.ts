import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('This is DirName: ', __dirname);

    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database_name'),
      entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*entity{.ts,.js}'],
      synchronize: false,
      cli: {
        entitiesDir: 'src',
        // migrationsDir: 'src/database/migrations',
      },
    } as TypeOrmModuleOptions;
  }
}
