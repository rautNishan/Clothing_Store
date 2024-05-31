import { CustomerEntity } from 'libs/common/entities/customer/customer.entity';
import { DeepPartial } from 'typeorm';

export class ICustomerUpdate {
  id: number;
  updateData: DeepPartial<CustomerEntity>;
}
