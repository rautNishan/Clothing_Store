import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserProtected } from '../guards/auth.user-protected.guard';

export function UserProtectedGuard(): MethodDecorator {
  return applyDecorators(UseGuards(UserProtected));
}
