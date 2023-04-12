import { AppDataSource } from "../../data-source";
import { myUser } from "../../types/type";
import { User } from "../entity/User"
import * as Crypto from 'crypto';
import { cityServiceChange } from "./cityService/changeCityService";

export const functionPut = async (ID:number, payload:myUser):Promise<string> => {
    const userRep = AppDataSource.getRepository(User)
    try {
        const userPut= await userRep.findOneBy({
            id: ID
        })

        const userPutArr = Object.keys(userPut);
        let count = 3;
        
        for(let item in payload) {
    
            if(count===6) {
                const salt = Crypto.randomBytes(16).toString('hex'); // генерируем соль
                const hash = Crypto.pbkdf2Sync(payload[item], salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
                userPut[userPutArr[count]] = hash;
                userPut[userPutArr[1]] = salt;
            }
    
            else {
                userPut[userPutArr[count]] = payload[item]; 
            }
            
            count++;
    
            if(count===8) {
                break; // город не добавляем
            }
        }
        await userRep.save(userPut);
        
        await cityServiceChange(ID, payload, userPut);
    
        console.log('Изменения сохранены!');
        console.log(userPut);
    }

    catch {
        return 'Такого пользователя не существует!';
    }
}