import { ROLES } from 'libs/database/constants/base.roles.enum';
import { BaseUserEntity } from 'libs/database/entity/base.user.entity';
import { Column, Entity } from 'typeorm';

export class CustomerFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseUserEntity {
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

  @Column({
    type: 'text',
    name: 'role',
    nullable: true,
    default: ROLES.CUSTOMER,
  })
  role: string;
}
