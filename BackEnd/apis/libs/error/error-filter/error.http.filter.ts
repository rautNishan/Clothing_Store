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
@Injectable()
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ExecutionContext) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();

    //Default
    let _status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let _message: string = 'Internal Server Error.';

    if (exception instanceof BadRequestException) {
      console.log('This is BadRequest Error');
      _status = exception.getStatus();
      const responseException = exception.getResponse();
      _message = responseException['message'];
      if (MessageChannel.length == 1) {
        _message = _message[0];
      }
    } else if (exception instanceof HttpException) {
      console.log('This is Http Error');
      _status = exception.getStatus();
      _message = exception.message;
    } else if (typeof exception === 'object' && exception != null) {
      console.log('This is Exception: ', exception);

      const _error = (
        exception as { error: { statusCode: number; message: string } }
      ).error;
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
