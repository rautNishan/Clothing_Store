import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { LoggerOptions } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { IDebuggerOptionService } from '../interfaces/debugger.options.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DebuggerOptionService implements IDebuggerOptionService {
  constructor(private readonly configService: ConfigService) {}
  createLogger(): LoggerOptions {
    const writeIntoFile = this.configService.get<string>(
      'debugger.writeIntoFile',
    );

    const maxFiles = this.configService.get<string>('debugger.maxFiles');
    const maxSize = this.configService.get<string>('debugger.maxSize');

    const transports: Transport[] | Transport = [];

    if (writeIntoFile) {
      transports.push(
        new DailyRotateFile({
          filename: `error-%DATE%.log`,
          dirname: `libs/logs/error`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: maxFiles,
          maxSize: maxSize,
          level: 'error',
          auditFile: 'libs/logs/error',
        }),
      );

      // transports.push(
      //   new DailyRotateFile({
      //     filename: `info-%DATE%.log`,
      //     dirname: `logs/info`,
      //     datePattern: 'YYYY-MM-DD',
      //     zippedArchive: true,
      //     maxFiles: maxFiles,
      //     maxSize: maxSize,
      //     level: 'info',
      //     auditFile: 'logs/info',
      //   }),
      // );
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
