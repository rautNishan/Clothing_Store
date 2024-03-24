import { RpcException } from '@nestjs/microservices';
import { IRpcException } from 'libs/error/interfaces/error.rpc.interface';

//Later can customize this class to throw custom errors
export class StrictRpcException extends RpcException {
  constructor(error: IRpcException) {
    super(error);
  }
  getError(): IRpcException {
    return super.getError() as IRpcException;
  }
}
