import { BaseUserEntity } from 'libs/database/entity/base.user.entity';
import { Entity } from 'typeorm';

export const ADMIN_TABLE_NAME = 'admin';
@Entity({ name: ADMIN_TABLE_NAME })
export class AdminEntity extends BaseUserEntity {}
