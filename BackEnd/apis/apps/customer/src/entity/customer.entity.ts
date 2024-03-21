import { BaseUserEntity } from 'libs/database/entity/base.user.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseUserEntity {
  @Column({
    type: 'text',
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'text',
    name: 'last_name',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'text',
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;
}
