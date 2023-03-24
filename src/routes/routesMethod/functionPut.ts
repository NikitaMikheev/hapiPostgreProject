import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"

export const functionPut = async (ID, params) => {
    const userRep = AppDataSource.getRepository(User)
    const userPut= await userRep.findOneBy({
        id: ID
    })

    const userPutArr = Object.keys(userPut);
    let count = 1;
    for(let item in params) {

        
        userPut[userPutArr[count]] = params[item] // доделать
        count++;

        if(count>=userPutArr.length) {
            console.log('Передано слишком много параметров! Лишние параметры обрезаны.');
            break;
        }
    }
    await userRep.save(userPut);

    console.log('Изменения сохранены!');
    console.log(userPut);
}