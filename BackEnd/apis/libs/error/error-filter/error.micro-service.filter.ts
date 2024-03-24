import { Catch, Injectable, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { IRpcException } from '../interfaces/error.rpc.interface';

@Injectable()
@Catch(RpcException)
export class MicroServiceExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    const micro_service_Response = exception.getError();
    const error = (micro_service_Response as { error }).error;

    return throwError(() => msErrorConverter(error));
  }
}

function msErrorConverter(error: IRpcException): IRpcException {
  return {
    statusCode: error.statusCode,
    message: error.message,
  };
}
