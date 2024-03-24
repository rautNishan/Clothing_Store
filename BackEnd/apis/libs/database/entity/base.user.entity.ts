import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';
import { DbBaseEntity } from './base.entity';

export class BaseUserEntity extends DbBaseEntity {
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
}
