import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.JWT_SECRET_KEY,
}));
