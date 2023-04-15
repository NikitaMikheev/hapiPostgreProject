import { functionGet, functionGetByCity } from '../../model/service/userServiceGet';
import { functionPost } from '../../model/service/userServicePost';
import { functionPut } from '../../model/service/userServicePut';
import { functionDel } from '../../model/service/userServiceDelete';
import { type myUser } from '../../types/type';
import { type User } from '../../model/entity/User';

export const handlerGet = async (request, h): Promise<string | boolean> => {
  try {
    const user: myUser = JSON.parse(await functionGet(request.query.id));
    console.log(`Пользователь получен: ${user.firstName} ${user.lastName}`);

    return `Имя: ${user.firstName} <br> Фамилия: ${user.lastName} <br> E-mail: ${user.userEmail} <br> Возраст: ${user.age}`;
  } catch {
    return 'Такого пользователя не существует!';
  }
};

export const handlerGetALLByCity = async (request, h): Promise<false | User[]> => {
  try {
    const users = await functionGetByCity(request.query.city);
    return users;
  } catch {
    return false;
  }
};

export const handlerPost = async (request, h): Promise<string | boolean> => {
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

    const res: boolean = await functionPost(formObj);

    if (!res) {
      return 'Пароли не совпадают!';
    }

    return 'Пользователь добавлен!';
  } catch (error) {
    console.log('Ошибка POST запроса');
    console.log(error);
    return false;
  }
};

export const handlerPut = async (request, h): Promise<string | boolean> => {
  try {
    const ID: number = request.params.id;

    if (await functionPut(ID, request.payload) === false) {
      return 'Такого пользователя не существует!';
    }

    return 'Изменения сохранены!';
  } catch (error) {
    console.log('Ошибка PUT запроса');
    console.log(error);
    return false;
  }
};

export const handlerDel = async (request, h): Promise<string | boolean> => {
  // удаляем пользователя по запросу (например, через Insomnia), в качестве параметров (через /) передаем id
  try {
    const ID: number = request.params.id;
    if (await functionDel(ID) === false) {
      return 'Такого пользователя не существует!';
    }

    console.log('Пользователь удален!');
    return 'Пользователь удален!';
  } catch (error) {
    console.log('Ошибка DELETE запроса');
    console.log(error);
    return false;
  }
};
