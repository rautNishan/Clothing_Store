import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { LoggerOptions } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { IDebuggerOptionService } from '../interfaces/debugger.options.interface';

export class DebuggerOptionService implements IDebuggerOptionService {
  constructor(private readonly configService: ConfigService) {}
  createLogger(): LoggerOptions {
    const writeIntoFile = true;

    const maxFiles = '7d';
    const maxSize = '2m';

    const transports: Transport[] | Transport = [];

    if (writeIntoFile) {
      transports.push(
        new DailyRotateFile({
          filename: `error-%DATE%.log`,
          dirname: `logs/error`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: maxFiles,
          maxSize: maxSize,
          level: 'error',
          auditFile: 'logs/error',
        }),
      );

      transports.push(
        new DailyRotateFile({
          filename: `info-%DATE%.log`,
          dirname: `logs/info`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxFiles: maxFiles,
          maxSize: maxSize,
          level: 'info',
          auditFile: 'logs/info',
        }),
      );
    }

    const LoggerOptions: LoggerOptions = {
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports,
    };

    return LoggerOptions;
  }
}
