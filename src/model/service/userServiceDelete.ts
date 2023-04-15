import { AppDataSource } from '../../data-source';
import { User } from '../entity/User';

export const functionDel = async (ID: number): Promise<string | boolean> => {
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
};
