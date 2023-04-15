import { AppDataSource } from '../../../data-source';
import { City } from '../../entity/City';
import { type myUser } from '../../../types/type';
import { User } from '../../entity/User';

export const cityServiceChange = async ( // Меняет связь юзера и города
  id: number,
  payload: myUser,
  newUser: User
): Promise<void> => {
  const cities = AppDataSource.getRepository(City);
  const users = AppDataSource.getRepository(User);

  const relationCities = await cities.find({
    // находим связи
    relations: {
      users: true
    }
  });

  const res = await users.find({
    // обязательно подгружаем связи !!!!!!!
    where: { id },
    relations: {
      city_user: true
    }
  });

  if (res[0].city_user !== null) {
    const pos = relationCities.map((e) => e.city).indexOf(res[0].city_user.city);
    const index = relationCities[pos].users.map((e) => e.id).indexOf(id);
    relationCities[pos].users.splice(index, 1);
    await AppDataSource.manager.save(relationCities); // чистим старые связи пользователя с городом
  }

  const city = await cities.findOneBy({
    city: payload.city
  });

  if (city !== null) {
    // такой город уже в базе данных, значит пушим юзера

    const indexNewCity = relationCities.map((e) => e.city).indexOf(payload.city); // находим индекс требуемого города

    relationCities[indexNewCity].users.push(newUser); // пушим в массив по индексу
    await AppDataSource.manager.save(relationCities); // НЕ ЗАБЫВАТЬ СОХРАНЯТЬ ИЗМЕНЕНИЯ В БД !!!!!!!!!!
  } else {
    const newCity = new City(); // новый экземпляр сущности Город
    newCity.city = payload.city; // вписываем имя
    newCity.users = [newUser]; // в массив добавляем пользователя

    await AppDataSource.manager.save(newCity);
    console.log('Город добавлен!');
  }
};
