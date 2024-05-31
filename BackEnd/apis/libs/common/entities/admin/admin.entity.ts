import { BaseUserEntity } from 'libs/common/database/base-entity/base.user.entity';
import { Entity } from 'typeorm';

export const ADMIN_TABLE_NAME = 'admin';
@Entity({ name: ADMIN_TABLE_NAME })
export class AdminEntity extends BaseUserEntity {}
