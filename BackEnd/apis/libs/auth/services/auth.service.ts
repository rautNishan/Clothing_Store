import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BaseUserEntity } from 'libs/database/entity/base.user.entity';
import { IJwtPayload } from '../interface/auth.interface';
@Injectable()
export class AuthService {
  //This class will check if the incoming login credential is valid or not and return jwt access token

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async checkAuthentication(
    incomingData: BaseUserEntity,
    databaseData: any,
  ): Promise<string> {
    const isAuthenticated: boolean = await bcrypt.compare(
      incomingData.password,
      databaseData.password,
    );
    if (!isAuthenticated) {
      throw new UnauthorizedException('User Name or Password did not match');
    }

    //if password match return with jwt access token
    const payload: IJwtPayload = {
      id: databaseData.id,
      role: databaseData.role,
      userName: databaseData.userName,
    };

    const token = await this.jwtService.signAsync(payload);
    console.log('This is Token: ', token);

    return token;
  }
}
