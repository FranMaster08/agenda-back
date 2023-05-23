import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as envconf } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../seeder/init';
envconf();

import { readdirSync } from 'fs';

export const configDatasource: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER || 'fran',
  password: process.env.DB_PASSWORD || 'passWord',
  database: process.env.DB_DATABASE || 'agenda',
  entities: [`${__dirname}/../**/**/*.entity{.ts,.js}`],
  migrations: readdirSync(path.join(__dirname, '../migration')).map(
    (item) => `${path.join(__dirname, `../migration/${item}`)}`,
  ),
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: true,
  seeds: [MainSeeder],
};

export const datasource = new DataSource(configDatasource);
