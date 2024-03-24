import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { IRpcException } from '../interfaces/error.rpc.interface';
@Injectable()
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ExecutionContext) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();

    //Default
    let _status: HttpStatus | number = HttpStatus.INTERNAL_SERVER_ERROR;
    let _message: string = 'Internal Server Error.';

    if (exception instanceof BadRequestException) {
      _status = exception.getStatus();
      const responseException = exception.getResponse();
      _message = responseException['message'];
      if (_message.length == 1) {
        _message = _message[0];
      }
    } else if (exception instanceof HttpException) {
      _status = exception.getStatus();
      _message = exception.message;
    } else if (typeof exception === 'object' && exception != null) {
      //For catching Exceptions from Micro-Services
      const _error = exception as IRpcException;
      _status = _error?.statusCode;
      _message = _error?.message;
    }
    response.status(_status).json({
      language: 'en',
      time: new Date().toISOString(),
      request: {
        method: request.method,
        url: request.url,
      },
      statusCode: _status,
      message: _message,
    });
  }
}
