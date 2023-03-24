import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import * as Crypto from 'crypto';

export const functionPost = async (formObj) => {
    const newUser = new User();
    console.log(formObj);

    newUser.firstName = formObj.firstName;
    newUser.lastName = formObj.lastName;
    newUser.email = formObj.userEmail;

    const salt = Crypto.randomBytes(16).toString('hex'); // генерируем соль
    const hash = Crypto.pbkdf2Sync(formObj.userPass, salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
    newUser.password = hash; // добавляем хешированный пароль в бд


    newUser.age = formObj.age;
    await AppDataSource.manager.save(newUser);
    console.log('Пользователь сохранен!');

    const users = await AppDataSource.manager.find(User)
    console.log("Пользователи в базе данных: ", users)
}
