import { AppDataSource } from "../../../data-source"
import { City } from "../../entity/City";
import { myUser } from "../../../types/type";

export const cityServicePost = async (formObj:myUser, newUser):Promise<void> => {
    const cities = AppDataSource.getRepository(City)
    const city = await cities.findOneBy({
        city: formObj.city
    })

    if(city) { // такой город уже в базе данных, значит пушим юзера в уже созданный массив
        const relationCities = await cities.find({ // находим связи
            relations: {
                users: true
            }
        })

        const index = relationCities.map(e => e.city).indexOf(formObj.city); // находим индекс требуемого нами города
 
        relationCities[index].users.push(newUser); // пушим в массив по индексу
        await AppDataSource.manager.save(relationCities); // НЕ ЗАБЫВАТЬ СОХРАНЯТЬ ИЗМЕНЕНИЯ В БД !!!!!!!!!! 
    }

    else {
        const newCity = new City(); // новый экземпляр сущности Город
        newCity.city = formObj.city; // вписываем имя
        newCity.users = [newUser]; // в массив добавляем пользователя
    
        await AppDataSource.manager.save(newCity);
        console.log('Город добавлен!');
    }
}
