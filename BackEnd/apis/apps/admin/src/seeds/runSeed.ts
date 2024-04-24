import { AppDataSource } from 'libs/database/data-source/main-data-source';
import { DataSource } from 'typeorm';
import { AdminSeed } from './admin.seed';

AppDataSource('admin', 'admin')
  .initialize()
  .then(async (dataSource: DataSource) => {
    const seeder = new AdminSeed();
    await seeder.run(dataSource);
    console.log('Seed complete!');
    await dataSource.destroy();
  })
  .catch((error) => console.log(error));
