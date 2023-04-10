import { AppDataSource } from "./data-source"
import { User } from "./model/entity/User";
import { City } from "./model/entity/City";
import 'reflect-metadata';



export function connectBD() {
    AppDataSource.initialize().then(async () => {
        
        const users = await AppDataSource.manager.find(User)
        console.log("Пользователи в базе данных:", users)
        AppDataSource.runMigrations(); // автоматический запуск миграций при старте 
        

    }).catch(error => console.log(error))
}
