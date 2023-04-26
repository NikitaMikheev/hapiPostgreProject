import { AppDataSource } from '../../../data-source';
import { City } from '../../entity/City';
import { User } from '../../entity/User';
import { type myUser } from '../../../types/type';
import * as Crypto from 'crypto';
import CityRepository from '../city';

const UserRepository = {
  get: async (ID: number): Promise<string> => {
    // Ищет по ID. Можно переделать под поиск любого поля
    const userRep = AppDataSource.getRepository(User);
    const userGet = await userRep.findOneBy({
      id: ID
    });

    if (userGet !== null) {
      const user = {
        firstName: userGet.firstName,
        lastName: userGet.lastName,
        userEmail: userGet.email,
        userPass: userGet.password,
        age: userGet.age
      };

      return JSON.stringify(user);
    }

    return 'Такого пользователя не существует!';
  },

  getByCity: async (city: string): Promise<User[]> => {
    // Ищет по городу
    const cities = AppDataSource.getRepository(City);

    const relationCities = await cities.find({
      // находим связи
      where: { city },
      relations: {
        users: true
      }
    });

    return relationCities[0].users;
  },

  create: async (formObj: myUser): Promise<boolean> => {
    const users = AppDataSource.getRepository(User);
    const user = await users.findOneBy({
      email: formObj.userEmail
    });

    if (user !== null) {
      return false; // пользователь с таким email уже зарегистрирован
    }

    if (formObj.userPass !== formObj.userPassConfm) {
      return false; // пароли не совпадают
    }

    const newUser = new User();
    console.log(formObj);

    newUser.firstName = formObj.firstName;
    newUser.lastName = formObj.lastName;
    newUser.email = formObj.userEmail;

    const salt = Crypto.randomBytes(16).toString('hex'); // генерируем соль
    const hash = Crypto.pbkdf2Sync(formObj.userPass, salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
    newUser.password = hash; // добавляем хешированный пароль в бд
    newUser.salt = salt; // сохраняем соль в бд для дальнейшей авторизации

    newUser.age = formObj.age;
    await AppDataSource.manager.save(newUser);
    console.log('Пользователь сохранен!');

    await CityRepository.addCity(formObj, newUser); // СВЯЗИ ЮЗЕРА С ГОРОДОМ

    const usersAll = await AppDataSource.manager.find(User);
    console.log('Пользователи в базе данных: ', usersAll);

    return true;
  },

  update: async (ID: number, payload: myUser): Promise<string | boolean> => {
    const userRep = AppDataSource.getRepository(User);
    try {
      const userPut = await userRep.findOneBy({
        id: ID
      });

      if (userPut === null) {
        return false;
      }

      const userPutArr = Object.keys(userPut);
      let count = 3;

      for (const item in payload) {
        if (count === 6) {
          const salt = Crypto.randomBytes(16).toString('hex'); // генерируем соль
          const hash = Crypto.pbkdf2Sync(payload[item], salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
          userPut[userPutArr[count]] = hash;
          userPut[userPutArr[1]] = salt;
        } else {
          userPut[userPutArr[count]] = payload[item];
        }

        count++;

        if (count === 8) {
          break; // город не добавляем
        }
      }

      await userRep.save(userPut);

      await CityRepository.updateCity(ID, payload, userPut); // МЕНЯЕМ СВЯЗИ ЮЗЕРА С ГОРОДОМ

      console.log('Изменения сохранены!');
      console.log(userPut);

      return true;
    } catch {
      return 'Такого пользователя не существует!';
    }
  },

  delete: async (ID: number): Promise<string | boolean> => {
    const userRep = AppDataSource.getRepository(User);

    try {
      const userRemove = await userRep.findOneBy({
        id: ID
      });
      if (userRemove !== null) {
        await userRep.remove(userRemove);
        const users = await AppDataSource.manager.find(User);
        console.log('Пользователи в базе данных: ', users);
        return true;
      }

      return false;
    } catch {
      return 'Такого пользователя не существует!';
    }
  }
};

export default UserRepository;
