import { ConfigService } from '@nestjs/config';
import winston, { LoggerOptions } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { IDebuggerOptionService } from '../interfaces/debugger.options.interface';

export class DebuggerOptionService implements IDebuggerOptionService {
  constructor(private readonly configService: ConfigService) {}
  createLogger(): LoggerOptions {
    const writeIntoFile = this.configService.get<boolean>(
      'debugger.writeIntoFile',
    );
    const maxFiles = this.configService.get<string>('debugger.maxFiles');
    const maxSize = this.configService.get<string>('debugger.maxSize');

    const transports: Transport[] | Transport = [];

    if (writeIntoFile) {
      transports.push(
        new DailyRotateFile({
          filename: `%DATE%.log`,
          dirname: ``,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxFiles: maxFiles,
          maxSize: maxSize,
          level: 'error',
        }),
      );

      transports.push(
        new DailyRotateFile({
          filename: `%DATE%.log`,
          dirname: ``,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxFiles: maxFiles,
          maxSize: maxSize,
          level: 'info',
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
