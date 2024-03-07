import { Module } from '@nestjs/common';
import { CustomerAdminController } from '../../modules/customer/controller/customer.admin.controller';

@Module({
  controllers: [CustomerAdminController],
})
export class AdminRouterModule {}
