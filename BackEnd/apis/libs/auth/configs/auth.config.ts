import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.JWT_SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
