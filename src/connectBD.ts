import { AppDataSource } from './data-source';
import { City } from './model/entity/City';
import { User } from './model/entity/User';
import 'reflect-metadata';

export const connectBD = (): void => {
  AppDataSource.initialize()
    .then(async () => {
      await AppDataSource.runMigrations(); // автоматический запуск миграций при старте

      const users = await AppDataSource.manager.find(User);
      console.log('Пользователи в базе данных:', users);

      const cities = await AppDataSource.manager.find(City);
      console.log('Города в базе данных:', cities);
    })
    .catch((error) => {
      console.log(error);
    });
};
