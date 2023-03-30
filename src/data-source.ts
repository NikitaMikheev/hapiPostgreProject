import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "nikita",   // пользователь - менять
    password: "20419435", // пароль - менять
    database: "postgres", // база данных - менять
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
