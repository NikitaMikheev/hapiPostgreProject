import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: String(process.env.POSTGRES_USER), // пользователь - менять
  password: String(process.env.POSTGRES_PASSWORD), // пароль - менять
  database: String(process.env.POSTGRES_DB), // база данных - менять
  synchronize: false,
  logging: false,
  entities: ['src/model/entity/*.ts'],
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  subscribers: []
});
