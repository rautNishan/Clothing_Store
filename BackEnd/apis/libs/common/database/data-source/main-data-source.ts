import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

//Takes two arguments, one database name and entity path

/**
 * This function return data source for generating and running migration for different database
 * and its related entity.
 * The arguments will make sure that only the database entity migrations stays together
 * Suppose if there are two databases entity changes, it will automatically know the database and only create
 * migration file for that database.
 * So wile running migration for the certain database it will know
 *
 */
export function AppDataSource(
  dataBaseName: string,
  entityPath: string,
): DataSource {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATA_BASE_HOST_DEVELOPMENT,
    port: parseInt(process.env.DATA_BASE_PORT || '5432'),
    username: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    database: dataBaseName,
    entities: [__dirname + `/../../entities/${entityPath}/*.entity{.ts,.js}`],
    migrations: [__dirname + `/../migrations/${entityPath}/*{.ts,.js}`],
    synchronize: false,
  });
}
