import { join } from 'path';
import { DataSource } from 'typeorm';
import { App } from './src/apps/app.entity';

export default new DataSource({
  type: 'sqlite',
  database: join(process.cwd(), 'apps', 'api', 'data', 'poki.sqlite'),
  entities: [App],
  synchronize: false,
  migrations: [join(__dirname, 'src', 'migrations', '*.{ts,js}')],
  migrationsRun: false,
  logging: process.env.NODE_ENV === 'development',
});
