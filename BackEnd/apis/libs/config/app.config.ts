import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  user_vendor_port: Number(process.env.USER_VENDOR_PORT) || 5000,
}));
