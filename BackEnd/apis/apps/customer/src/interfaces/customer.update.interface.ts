import { CustomerEntity } from 'libs/entities/customer/customer.entity';
import { DeepPartial } from 'typeorm';

export class ICustomerUpdate {
  id: number;
  updateData: DeepPartial<CustomerEntity>;
}
