import { DeepPartial } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

export class ICustomerUpdate {
  id: number;
  updateData: DeepPartial<CustomerEntity>;
}
