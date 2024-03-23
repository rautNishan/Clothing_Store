import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import { DebuggerService } from '../services/debugger.service';

@Injectable()
export class DebuggerInterceptor implements NestInterceptor {
  private readonly writeIntoFile: boolean;

  constructor(private readonly debuggerService: DebuggerService) {
    // Assuming writeIntoFile is always true for simplification
    // In a real scenario, you might want to fetch this from your configuration
    this.writeIntoFile = true;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!this.writeIntoFile) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.debuggerService.info({
            request: {
              type: 'request',
              method: request.method,
              path: request.path,
              originalUrl: request.originalUrl,
              params: request.params,
              body: request.body,
              hostname: request.hostname,
              protocol: request.protocol,
              data: data,
            },
            response: {
              type: 'response',
              statusCode: response.statusCode,
              duration: `${duration}ms`,
            },
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.debuggerService.error({
            request: {
              type: 'request',
              method: request.method,
              path: request.path,
              originalUrl: request.originalUrl,
              params: request.params,
              body: request.body,
              hostname: request.hostname,
              protocol: request.protocol,
            },
            error: {
              statusCode: error?.error?.statusCode,
              message: error?.error?.message,
            },
            duration: `${duration}ms`,
          });
        },
      }),
    );
  }
}
