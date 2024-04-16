import { UseGuards, applyDecorators } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/auth.user-google.guard';

export function GoogleProtected(): MethodDecorator {
  return applyDecorators(UseGuards(GoogleAuthGuard));
}
