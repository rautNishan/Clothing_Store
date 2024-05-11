import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';
import { IJwtPayload } from '../interface/auth.interface';
import { IBaseLoginInfo } from '../interface/base-login-info.interface';
@Injectable()
export class AuthService {
  //This class will check if the incoming login credential is valid or not and return jwt access token

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async checkAuthentication(
    incomingData: IBaseLoginInfo,
    databaseData: any,
  ): Promise<string> {
    const isAuthenticated: boolean = await bcrypt.compare(
      incomingData.password,
      databaseData.password,
    );

    if (!isAuthenticated) {
      throw new StrictRpcException({
        message: 'User Name or Password did not match',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    //if password match return with jwt access token
    const payload: IJwtPayload = {
      id: databaseData.id,
      role: databaseData.role,
      userName: databaseData.userName,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async googleAuth() {
    return 'this is google auth';
  }
}
