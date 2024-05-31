import { ROLES } from 'libs/common/database/constants/base.roles.enum';

export interface IJwtPayload {
  userName: string;
  role: ROLES;
  id: number;
}
