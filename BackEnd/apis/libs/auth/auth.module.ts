import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import authConfig from './configs/auth.config';
import { AuthService } from './services/auth.service';
import { UserProtected } from './guards/auth.user-protected.guard';
import { GoogleStrategy } from './google/google.strategy';
// import { UserProtected } from './guards/auth.user-protected.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [authConfig],
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required().min(10),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.secretKey'),
        signOptions: { expiresIn: '6000s' },
      }),
    }),
  ],
  providers: [AuthService, GoogleStrategy, UserProtected],
  exports: [AuthService, GoogleStrategy, UserProtected],
})
export class AuthModule {}
