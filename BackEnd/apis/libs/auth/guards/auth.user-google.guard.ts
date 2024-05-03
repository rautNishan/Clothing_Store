import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    try {
      const activate = (await super.canActivate(context)) as boolean;
      const request: Request = context.switchToHttp().getRequest<Request>();
      await super.logIn(request);
      return activate;
    } catch (error) {
      console.log('This is Error: ', error);
    }
    return false;
  }
}

// @Injectable()
// export class GoogleAuthGuard implements CanActivate {
//   constructor() {}
//   async canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {

//   }
// }
