import { AppDataSource } from "../../data-source"
import { City } from "../entity/City"
import { User } from "../entity/User"

export const functionGet = async (ID:number):Promise<string> => { // Ищет по ID. Можно переделать под поиск любого поля
    const userRep = AppDataSource.getRepository(User)
    const userGet = await userRep.findOneBy({
        id: ID
    })

    if(userGet) {
        const user = {
            firstName: userGet.firstName,
            lastName: userGet.lastName,
            userEmail: userGet.email,
            userPass: userGet.password,
            age: userGet.age
        }

        return JSON.stringify(user);
    }

    return 'Такого пользователя не существует!';
}

export const functionGetByCity = async (city:string):Promise<User[]> => { // Ищет по городу
    const users = AppDataSource.getRepository(User);
    const cities = AppDataSource.getRepository(City);

    const relationCities = await cities.find({ // находим связи
        where: { city },
        relations: {
            users: true
        }
    })    


   return relationCities[0].users;
    

}