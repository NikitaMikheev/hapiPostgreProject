import { AppDataSource } from "../../data-source";
import { User } from "../entity/User"
import * as Crypto from 'crypto';

export const functionPut = async (ID, payload) => {
    const userRep = AppDataSource.getRepository(User)
    try {
        const userPut= await userRep.findOneBy({
            id: ID
        })

        const userPutArr = Object.keys(userPut);
        let count = 2;
        for(let item in payload) {
    
            if(count==5) {
                const salt = Crypto.randomBytes(16).toString('hex'); // генерируем соль
                const hash = Crypto.pbkdf2Sync(payload[item], salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
                userPut[userPutArr[count]] = hash;
                userPut[userPutArr[1]] = salt;
            }
    
            else {
                userPut[userPutArr[count]] = payload[item]; 
            }
            
            count++;
    
            if(count>userPutArr.length) {
                console.log('Передано слишком много параметров! Лишние параметры обрезаны.');
                break;
            }
        }
        await userRep.save(userPut);
    
        console.log('Изменения сохранены!');
        console.log(userPut);
    }

    catch {
        return 'Такого пользователя не существует!';
    }
}