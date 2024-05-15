import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response, response } from 'express';
import { Observable, map } from 'rxjs';
import {
  IPaginationMeta,
  IResponse,
  IResponsePaging,
} from '../interfaces/response.interface';
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

          let data: any;
          let _pagination: IPaginationMeta | undefined;
          const metaData = {
            path: _path,
          };

          const incomingResponseData: IResponse | IResponsePaging = await res;

          if (incomingResponseData) {
            _pagination = (incomingResponseData as IResponsePaging)
              ?._pagination;
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
            _pagination,
          };
        }),
      );
    }
    return next.handle();
  }
}
