import { BaseUserEntity } from 'libs/database/base-entity/base.user.entity';
import { Column, Entity } from 'typeorm';

export class VendorFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

@Entity({ name: 'vendor' })
export class VendorEntity extends BaseUserEntity {
  @Column({
    type: 'jsonb',
    name: 'vendor_full_name',
    nullable: false,
  })
  vendorName: VendorFullName;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'contact',
    nullable: true,
  })
  contact: string;
}