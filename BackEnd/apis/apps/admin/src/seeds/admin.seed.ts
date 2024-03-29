import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();
import { Seeder } from 'typeorm-extension';
import { AdminEntity } from '../entity/admin.entity';
export class AdminSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE "admin" RESTART IDENTITY;');
    const repository = dataSource.getRepository(AdminEntity);
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await repository.insert({
      userName: 'admin',
      password: password,
    });
  }
}
