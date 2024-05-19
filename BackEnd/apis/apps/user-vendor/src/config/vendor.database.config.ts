import { registerAs } from '@nestjs/config';
import { VENDOR_DATABASE_NAME } from '../constants/vendor.constant';

export default registerAs('vendorDatabase', () => ({
  type: process.env.DATA_BASE_TYPE,
  host: process.env.DATA_BASE_HOST_DEVELOPMENT,
  port: parseInt(process.env.DATA_BASE_PORT || '5432'),
  username: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  database_name: VENDOR_DATABASE_NAME,
}));
