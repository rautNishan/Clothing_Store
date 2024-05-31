import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FilterDataInterceptor } from '../interceptors/response.data.interceptor';

export function ResponseDataDecorator(): MethodDecorator {
  return applyDecorators(UseInterceptors(FilterDataInterceptor));
}
