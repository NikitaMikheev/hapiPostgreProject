import UserRepository from '../../model/repository/CRUD';
import { type myUser } from '../../types/type';
import { type User } from '../../model/entity/User';

export default {
  handlerGet: async (request, h): Promise<string | boolean> => {
    try {
      const user: myUser = JSON.parse(await UserRepository.get(request.query.id));
      console.log(`Пользователь получен: ${user.firstName} ${user.lastName}`);

      return `Имя: ${user.firstName} <br> Фамилия: ${user.lastName} <br> E-mail: ${user.userEmail} <br> Возраст: ${user.age}`;
    } catch {
      return 'Такого пользователя не существует!';
    }
  },

  handlerGetALLByCity: async (request, h): Promise<false | User[]> => {
    try {
      const users = await UserRepository.getByCity(request.query.city);
      return users;
    } catch {
      return false;
    }
  },

  handlerPost: async (request, h): Promise<string | boolean> => {
    // добавление пользователя через форму
    try {
      const formObj: myUser = {
        firstName: request.payload.userName,
        lastName: request.payload.userLastName,
        userEmail: request.payload.userEmail,
        userPass: request.payload.userPass,
        userPassConfm: request.payload.userPassConfm,
        age: parseInt(request.payload.userAge),
        city: request.payload.userCity
      };

      const res: boolean = await UserRepository.create(formObj);

      if (!res) {
        return 'Пароли не совпадают!';
      }

      return 'Пользователь добавлен!';
    } catch (error) {
      console.log('Ошибка POST запроса');
      console.log(error);
      return false;
    }
  },

  handlerPut: async (request, h): Promise<string | boolean> => {
    try {
      const ID: number = request.params.id;

      if ((await UserRepository.update(ID, request.payload)) === false) {
        return 'Такого пользователя не существует!';
      }

      return 'Изменения сохранены!';
    } catch (error) {
      console.log('Ошибка PUT запроса');
      console.log(error);
      return false;
    }
  },

  handlerDel: async (request, h): Promise<string | boolean> => {
    // удаляем пользователя по запросу (например, через Insomnia), в качестве параметров (через /) передаем id
    try {
      const ID: number = request.params.id;
      if ((await UserRepository.delete(ID)) === false) {
        return 'Такого пользователя не существует!';
      }

      console.log('Пользователь удален!');
      return 'Пользователь удален!';
    } catch (error) {
      console.log('Ошибка DELETE запроса');
      console.log(error);
      return false;
    }
  }
};
