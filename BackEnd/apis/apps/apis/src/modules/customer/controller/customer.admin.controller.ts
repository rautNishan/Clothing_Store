import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerAdminDocs } from '../docs/customer.admin.doc';
@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor() {}

  @CustomerAdminDocs()
  @Post('/create')
  async create() {
    console.log('Request Made to Create a new customer');
    console.log('Create a new customer');
  }
}
