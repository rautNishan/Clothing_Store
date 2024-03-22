import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DebuggerService } from '../services/debugger.service';
import { Observable, tap } from 'rxjs';
import { IRequestApp } from 'libs/request/request.interface';
import { Response } from 'express';

@Injectable()
export class DebuggerInterceptor implements NestInterceptor<Promise<any>> {
  private readonly writeIntoFile: boolean;
  constructor(
    private readonly configService: ConfigService,
    private readonly debuggerService: DebuggerService,
  ) {
    this.writeIntoFile = this.configService.get<boolean>(
      'debugger.writeIntoFile',
    );
  }
  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<any> | string>> {
    if (ctx.getType() === 'http') {
      const request: IRequestApp = ctx.switchToHttp().getRequest<IRequestApp>();
      if (this.writeIntoFile) {
        this.debuggerService.info({
          type: 'request',
          method: request.method,
          path: request.path,
          originalUrl: request.originalUrl,
          params: request.params,
          body: request.body,
          baseUrl: request.baseUrl,
          query: request.query,
          ip: request.ip,
          hostname: request.hostname,
          protocol: request.protocol,
        });
      }

      return next.handle().pipe(
        tap(() => {
          const response: Response = ctx.switchToHttp().getResponse<Response>();
          if (this.writeIntoFile) {
            this.debuggerService.info({
              type: 'response',
              statusCode: response.statusCode,
              message: response.statusMessage,
            });
          }
        }),
      );
    }
  }
}
