import { ROLES } from 'libs/common/database/constants/base.roles.enum';

export interface IBaseUser {
  userName: string;
  password: string;
  role: ROLES;
}
