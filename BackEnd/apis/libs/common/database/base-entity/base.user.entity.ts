import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';
import { DbBaseEntity } from './base.entity';
import { ROLES } from '../constants/base.roles.enum';
import { IBaseUser } from 'libs/common/interfaces/base-user/base-user.interface';

export class BaseUserEntity extends DbBaseEntity implements IBaseUser {
  @Exclude()
  @Column({
    type: 'text',
    name: 'user_name',
    nullable: false,
    unique: true,
  })
  userName: string;

  @Exclude()
  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    name: 'role',
    nullable: true,
  })
  role: ROLES;
}
