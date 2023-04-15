import { AppDataSource } from '../../data-source';
import { User } from '../entity/User';
import * as Crypto from 'crypto';
import { type myUser } from '../../types/type';
import { cityServicePost } from './cityService/cityServicePost';

export const functionPost = async (formObj: myUser): Promise<boolean> => {
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

  await cityServicePost(formObj, newUser); // СВЯЗИ ЮЗЕРА С ГОРОДОМ

  const usersAll = await AppDataSource.manager.find(User);
  console.log('Пользователи в базе данных: ', usersAll);

  return true;
};
