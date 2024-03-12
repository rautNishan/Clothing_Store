import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  user_vendor_port:
    Number(process.env.MICRO_SERVICE_USER_VENDOR_SERVICE_PORT) || 5000,
  customer_port:
    Number(process.env.MICRO_SERVICE_CUSTOMER_SERVICE_PORT) || 5001,
}));
