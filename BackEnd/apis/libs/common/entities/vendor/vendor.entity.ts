import { BaseUserEntity } from 'libs/common/database/base-entity/base.user.entity';
import {
  IVendor,
  IVendorFullName,
} from 'libs/common/interfaces/vendor/vendor.interface';
import { Column, Entity } from 'typeorm';

export class VendorFullName implements IVendorFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export const VENDOR_TABLE_NAME = 'vendor';

@Entity({ name: VENDOR_TABLE_NAME })
export class VendorEntity extends BaseUserEntity implements IVendor {
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
