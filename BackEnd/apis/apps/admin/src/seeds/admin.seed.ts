import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
dotenv.config();
import { ROLES } from 'libs/common/database/constants/base.roles.enum';
import { AdminEntity } from 'libs/common/entities/admin/admin.entity';
export class AdminSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE "admin" RESTART IDENTITY;');
    const repository = dataSource.getRepository(AdminEntity);
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await repository.insert({
      userName: 'admin',
      password: password,
      role: ROLES.ADMIN,
    });
  }
}
