import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IParam } from '../interfaces/param.id.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

//Guard to check param of id
@Injectable()
export class ParamGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const param: IParam = ctx.getRequest().params;

    //From Request taking param and checking if it is a valid number or not
    if (param.id === null || isNaN(param.id)) {
      throw new UnprocessableEntityException('Invalid Param');
    }
    return true;
  }
}
