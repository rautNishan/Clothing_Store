import { Column } from 'typeorm';
import { DbBaseEntity } from './base.entity';

export class BaseUserEntity extends DbBaseEntity {
  @Column({
    type: 'text',
    name: 'user_name',
    nullable: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password: string;
}
