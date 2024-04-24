import { registerAs } from '@nestjs/config';
import { CUSTOMER_DATA_BASE_NAME } from '../constants/customer.constant';

export default registerAs('database', () => ({
  type: process.env.DATA_BASE_TYPE,
  host: process.env.DATA_BASE_HOST_DEVELOPMENT,
  port: parseInt(process.env.DATA_BASE_PORT || '5432'),
  username: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  database_name: CUSTOMER_DATA_BASE_NAME,
}));
