import { AppDataSource } from "../../data-source";
import { User } from "../entity/User"
import * as Crypto from 'crypto';

export const validate = async (request, eAdress, password) => {
    const users = AppDataSource.getRepository(User)
    const user = await users.findOneBy({
        email: eAdress
    })

    if(!user) {
        return { credentials: null, isValid: false };
    }

    const pass = Crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль

    
    if(pass===user.password) {
        return {isValid: true, credentials: {id: user.id, name: user.firstName}};
    }

    return { isValid: false, credentials: {id: user.id, name: user.firstName}  };
}