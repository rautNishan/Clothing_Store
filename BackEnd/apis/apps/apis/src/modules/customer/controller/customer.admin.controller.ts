import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
@ApiTags('Customer')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerAdminController {
  constructor() {}

  @ApiProperty({
    type: 'string',
    description: 'Create a new customer',
  })
  @ApiOperation({ summary: 'Create a new customer' })
  @Post('/create')
  async create() {
    console.log('Create a new customer');
  }
}
