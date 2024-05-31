import { registerAs } from '@nestjs/config';

export default registerAs('debugger', () => ({
  writeIntoFile: process.env.DEBUGGER_WRITE_INTO_FILE || true,
  maxFiles: process.env.DEBUGGER_MAX_FILE || '7d', //Number or String CheckOut for more information
  maxSize: process.env.DEBUGGER_MAX_SIZE || '2m',
}));
