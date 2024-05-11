import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Profile, Strategy } from 'passport-google-oauth20';
dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URI,
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('Validate Is Called');
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
  }
}
