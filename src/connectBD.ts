import { AppDataSource } from "./data-source"
import { User } from "./model/entity/User";
import { Test } from "./model/entity/test";
import 'reflect-metadata';


export function connectBD() {
    AppDataSource.initialize().then(async () => {

        const users = await AppDataSource.manager.find(User)
        console.log("Пользователи в базе данных:", users)

        const test = await AppDataSource.manager.find(Test)
        console.log('Тут тестовая база данных: ', test)


    }).catch(error => console.log(error))
}
