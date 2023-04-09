import { AppDataSource } from "../../data-source";
import { User } from "../entity/User";
import config from "../../config";
import jwt from 'jsonwebtoken';

export const tokenDelete = async (token):Promise<boolean> => {
    const decodedData = jwt.verify(token, config.refresh); // декодируем токен, подставляя в него ключ

    if(!decodedData) { // если рефреш токен просрочен, тогда вернёт false.  
        return false;
    }

    const users = AppDataSource.getRepository(User)

    const user = await users.findOneBy({
        id: decodedData.id
    })
    
    if(!user) {
        return false;
    }

    if(token===user.refreshToken) { // после всех проверок удаляем токен из базы данных. Пользователь разлогинился
        user.refreshToken = null;
        await users.save(user);
        return true;
    }

    else {
        return false;
    }
}