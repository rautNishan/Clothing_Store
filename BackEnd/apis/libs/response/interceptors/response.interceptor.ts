import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response, response } from 'express';
import { Observable, map } from 'rxjs';
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (res: any) => {
          const ctx = context.switchToHttp();
          const _request: Request = ctx.getRequest<Request>();
          const _response: Response = ctx.getResponse<Response>();
          const _path = _request.path;
          const _status = _response.statusCode;

          const _messagePath: string = this.reflector.get<string>(
            'responseMessage',
            context.getHandler(),
          );
          let data: undefined;
          const metaData = {
            path: _path,
          };
          const incomingResponseData = await res;
          if (incomingResponseData) {
            data = incomingResponseData;
          }
          response.status(_status);
          return {
            language: 'en',
            date: new Date().toISOString(),
            statusCode: _status,
            message: _messagePath,
            metaData: metaData,
            data,
          };
        }),
      );
    }
    return next.handle();
  }
}
