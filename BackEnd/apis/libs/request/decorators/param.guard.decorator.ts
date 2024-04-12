import { UseGuards, applyDecorators } from '@nestjs/common';
import { ParamGuards } from '../guards/request.param.id.guard';

export function UseParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ParamGuards));
}
