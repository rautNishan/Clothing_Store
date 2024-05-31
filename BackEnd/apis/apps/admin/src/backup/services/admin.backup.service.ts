import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import * as fs from 'fs';
import { StrictRpcException } from 'libs/common/error/strict-rpc-class/micro-service-error';

@Injectable()
export class AdminBackUpService {
  constructor(private readonly _configService: ConfigService) {}
  private readonly logger = new Logger(AdminBackUpService.name);

  async databaseBackUp(databaseName: string): Promise<string> {
    try {
      //   const date = new Date();

      //Your database host (even if its on hosted on server)
      const dbHost: string | undefined =
        this._configService.get<string>('database.host');

      //Your database name (heroDatabase) for taking it's backup
      const dbName: string | undefined = databaseName;

      //Your database user name
      const dbUsername: string | undefined =
        this._configService.get<string>('database.username');

      //Your database password
      const dbPassword: string | undefined =
        this._configService.get<string>('database.password');

      //Passing node environment so it will not ask password prompt in the terminal
      const env = { ...process.env, PGPASSWORD: dbPassword }; //Avoiding imputing password in prompt(terminal)

      //Where should be shaved
      const folderName = './backup/database/';

      //Check if folder exists or not
      this.ensureDirectoryExistence(folderName);

      //What file name should be saved as a backup
      const fileName = folderName + `database_backup_${dbName}.tar`;

      //Postgres dump command to be executed
      const dataBaseDumpCommand: string = `pg_dump -F t -h ${dbHost}, -U ${dbUsername} ${dbName} > ${fileName}`;

      //Check if any of these are undefined or not
      if (dbName && dbHost && dbUsername && dbPassword) {
        // Executing BackUp
        await new Promise<void>((resolve, reject) => {
          exec(dataBaseDumpCommand, { env }, (error) => {
            if (error) {
              return reject(error);
            }
            return resolve();
          });
        });
      } else {
        throw new StrictRpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message:
            'Something went wrong while taking backup. Please check your configuration',
        });
      }
      return 'Completed';
    } catch (error) {
      throw new StrictRpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async databaseTableBackUp(databaseName: string, tableNames: string[]) {
    try {
      // const { tables } = tableNames; //Extracting incoming table name from dto

      //Your database host (even if its on hosted on server)
      const dbHost: string | undefined =
        this._configService.get<string>('database.host');

      //Your database (name) for taking it's backup
      const dbName: string | undefined = databaseName;

      //Your database user name
      const dbUsername: string | undefined =
        this._configService.get<string>('database.username');

      //Your database password
      const dbPassword: string | undefined =
        this._configService.get<string>('database.password');

      //Passing node environment so it will not ask password prompt in the terminal
      const env = { ...process.env, PGPASSWORD: dbPassword }; //Avoiding imputing password in prompt(terminal)

      //Where should be shaved
      const folderName = './backup/table/';

      //Check if folder exists or not
      this.ensureDirectoryExistence(folderName);

      //What file name should be saved as a backup
      const fileName: string =
        folderName + `database_tables_backup_${dbName}.tar`;

      //Map all the tables that need to be backed up
      const tableOptions: string = tableNames
        .map((table) => `-t ${table}`)
        .join(' '); // this is how it will store '-t table1 -t table2'

      const databaseTableDumpCommand: string = `pg_dump -F t -h ${dbHost} -U ${dbUsername} ${tableOptions} ${dbName} > ${fileName}`;

      if (dbName && dbHost && dbUsername && dbPassword) {
        // Executing BackUp
        await new Promise<void>((resolve, reject) => {
          exec(databaseTableDumpCommand, { env }, (error) => {
            if (error) {
              return reject(error);
            }
            return resolve();
          });
        });
      } else {
        throw new StrictRpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message:
            'Something went wrong while taking backup. Please check your configuration',
        });
      }
      return 'Completed';
    } catch (error) {
      throw new StrictRpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  //Function that create folder if it does not exists
  ensureDirectoryExistence(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      //Making directory if it does not exists
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
}
