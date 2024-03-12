export const User_Vendor = {
  name: 'USER_VENDOR',
  host: process.env.DATA_BASE_HOST_DEVELOPMENT || 'localhost',
  port: Number(process.env.MICRO_SERVICE_USER_VENDOR_SERVICE_PORT || 5000),
};

export const Customer = {
  name: 'CUSTOMER',
  host: process.env.DATA_BASE_HOST_DEVELOPMENT || 'localhost',
  port: Number(process.env.MICRO_SERVICE_CUSTOMER_SERVICE_PORT || 5001),
};
