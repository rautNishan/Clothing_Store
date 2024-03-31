import { AppDataSource } from 'libs/database/data-source/data-source';
import { DataSource } from 'typeorm';
import { AdminSeed } from './admin.seed';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    const seeder = new AdminSeed();
    await seeder.run(dataSource);
    console.log('Seed complete!');
    await dataSource.destroy();
  })
  .catch((error) => console.log(error));
