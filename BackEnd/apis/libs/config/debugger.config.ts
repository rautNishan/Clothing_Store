import { registerAs } from '@nestjs/config';

export default registerAs(
  'debugger',
  (): Record<string, any> => ({
    writeIntoFile: process.env.DEBUGGER_WRITE_INTO_FILE,
    maxFiles: process.env.DEBUGGER_MAX_FILE, //Number or String CheckOut for more information
    maxSize: process.env.DEBUGGER_MAX_SIZE,
  }),
);
