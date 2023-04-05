import { AppDataSource } from "./data-source"
import { User } from "./model/entity/User";
import 'reflect-metadata';


export function connectBD() {
    AppDataSource.initialize().then(async () => {
        
        const users = await AppDataSource.manager.find(User)
        console.log("Пользователи в базе данных:", users)

    }).catch(error => console.log(error))
}
