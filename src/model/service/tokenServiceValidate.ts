import { AppDataSource } from "../../data-source";
import { User } from "../entity/User"
import * as Crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "../../config";
import { Tokens } from "../../types/type";

export const validate = async (eAdress, password): Promise<false | Tokens> => {
    const users = AppDataSource.getRepository(User)
    const user = await users.findOneBy({
        email: eAdress
    })
    
    if(!user) {
        return false;
    }

    const pass = Crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль
    
    if(pass===user.password) {
        const accessToken:string = jwt.sign({ 
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            id: user.id,
            sub: false,
            maxAgeSec: 600, // 10 минут жизни токена
            timeSkewSec: 15
        }, config.secret); 

        const refreshToken:string = jwt.sign({ 
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            id: user.id,
            sub: false,
            timeSkewSec: 15
        }, config.refresh, { expiresIn: '60d' }); // рефреш токен живет 60 дней

        user.refreshToken = refreshToken;  
        await users.save(user);
        return {
            accessToken,
            refreshToken, // возвращает на клиент 2 токена. Аксесс для доступа. Когда он протухает, с клиента по руту authentication/refresh будет направлен рефреш токен, который сгенерирует новый акссес и рефреш токен и вернет это на клиент 
        }           
    }

    return false;
}