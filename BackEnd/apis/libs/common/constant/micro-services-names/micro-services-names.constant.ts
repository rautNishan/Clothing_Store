export const ADMIN = {
  name: 'ADMIN',
  host: process.env.DATA_BASE_HOST_DEVELOPMENT || 'localhost',
  port: Number(process.env.MICRO_SERVICE_ADMIN_SERVICE_PORT || 5000),
};

export const CUSTOMER = {
  name: 'CUSTOMER',
  host: process.env.DATA_BASE_HOST_DEVELOPMENT || 'localhost',
  port: Number(process.env.MICRO_SERVICE_CUSTOMER_SERVICE_PORT || 5001),
};

export const USER_VENDOR = {
  name: 'USER_VENDOR',
  host: process.env.DATA_BASE_HOST_DEVELOPMENT || 'localhost',
  port: Number(process.env.MICRO_SERVICE_USER_VENDOR_SERVICE_PORT || 5002),
};
