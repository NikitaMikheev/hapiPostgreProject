import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"

export const functionDel = async (ID) => {
    const userRep = AppDataSource.getRepository(User)

    try {
        const userRemove = await userRep.findOneBy({
            id: ID
        })
    
        await userRep.remove(userRemove);
    
        const users = await AppDataSource.manager.find(User)
        console.log("Пользователи в базе данных: ", users)
    }

    catch {
        return 'Такого пользователя не существует!';
    }
}