import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { Observable } from 'rxjs';
// Response
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';
import { IJwtPayload } from '../interface/auth.interface';
@Injectable()
export class UserProtected implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const header: IncomingHttpHeaders = request.headers;

    //extract token
    const token = this.extractTokenFromHeader(header);
    if (!token) {
      throw new UnauthorizedException('Not Authenticated');
    }

    // Decode token
    const data: IJwtPayload = this.jwtService.decode(token);

    //get request url (which user is requesting which route | url)
    const requestingRote = request.url.split('/')[2]; //Take the first since our rout is define that way

    //Check the role of user and if it is requesting to the rout that it should be requested
    const { role } = data;
    if (role !== requestingRote.toUpperCase()) {
      throw new UnauthorizedException('Not Permitted');
    }
    return true;
  }

  //Returns token if found else returns null or undefined
  extractTokenFromHeader(
    header: IncomingHttpHeaders,
  ): string | null | undefined {
    const token = header.authorization?.split(' ')[1];
    return token;
  }
}
