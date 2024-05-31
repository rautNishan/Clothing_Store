import { BaseUserEntity } from 'libs/common/database/base-entity/base.user.entity';
import {
  ICustomer,
  ICustomerFullName,
} from 'libs/common/interfaces/customer/customer.interface';
import { Column, Entity } from 'typeorm';

export class CustomerFullName implements ICustomerFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseUserEntity implements ICustomer {
  @Column({
    type: 'jsonb',
    name: 'customer_full_name',
    nullable: false,
  })
  customerName: CustomerFullName;

  @Column({
    type: 'text',
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    name: 'contact',
    nullable: false,
    unique: true,
  })
  contact: string;
}
