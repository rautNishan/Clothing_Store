import { Injectable } from '@nestjs/common';

@Injectable()
export class UserVendorService {
  getHello(): string {
    return 'Hello World!';
  }
}
