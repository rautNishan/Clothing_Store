import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IDebuggerService } from '../interfaces/debugger.service.interface';

export class DebuggerService implements IDebuggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, //Import from winston
  ) {}

  info(log: any): void {
    this.logger.info(log);
  }

  debug(log: any): void {
    this.logger.debug(log);
  }

  warn(log: any): void {
    this.logger.warn(log);
  }

  error(log: any): void {
    this.logger.error(log);
  }
}
