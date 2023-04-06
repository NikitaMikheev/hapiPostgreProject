import Joi from "joi";
import { handlerRegister } from "./controllers/authorizationController";
import { handlerAuthentication } from "./controllers/authorizationController";
import { handlerRefreshAuthentication } from "./controllers/authorizationController";
import { AppDataSource } from "../data-source";
import { User } from "../model/entity/User";

const register = ({ // рут для регистрации
    method: 'POST',
    path: '/register',
    options: {
        description: 'Регистрация пользователя',
        notes: 'Регистрирует пользователя, добавляет его в бд',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: Joi.object({
                userName: Joi.string().description('Имя пользователя'),
                userLastName: Joi.string().description('Фамилия пользователя'),
                userEmail: Joi.string().description('E-mail пользователя'),
                userPass: Joi.string().description('Пароль пользователя'),
                userPassConfm: Joi.string().description('Подтверждение пароля'),
                userAge: Joi.number().description('Возраст пользователя')
            })
        },
        
    },
    handler: handlerRegister
});

const authentication = ({ // Рут аутентификации. Пост запрос передает логин и пароль. Рут возвращает на клиент два токена - access и refresh 
    method: "POST",
    path: "/authentication",
    options: {
        description: 'Авторизация',
        notes: 'Авторизация по email и паролю',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().description('Email пользователя'),
                password: Joi.string().description('Пароль пользователя'),
            })
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
    },
    handler: handlerAuthentication // После аутентификации возвращает токен на клиент.
});


const authenticationRefresh = ({ // Рут на обновление refresh токена после протухания токена access. Пост запрос передает рефреш токен, в теле которого вшит id пользователя
    method: "POST",
    path: "/authentication/refresh",
    options: {
        description: 'Рефреш токена',
        notes: 'Передает рефреш токен для обновления токенов',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                token: Joi.string().description('Refresh token пользователя'),
            })
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
    },

    handler: handlerRefreshAuthentication // Вовзращает на клиент обновленные токены
});


const authorize = ({ // Рут на авторизацию со стратегией 'jwt_token'. Принимает с клиента access токен. Если токен валидируется - авторизирован.
    method: "POST",
    path: "/login",
    options: {
        description: 'Вход',
        notes: 'Вход',
        tags: ['api'],
        auth: 'jwt_token',
    },
    handler: async (artifacts,request, h) => {
        const users = AppDataSource.getRepository(User)
        const user = await users.findOneBy({
            id: artifacts.auth.artifacts.decoded.payload.id
        })
        if(user.refreshToken===null) { // проверяем есть ли у пользователя рефреш токен (если нет, то он разлогинен)
            return {
                isValid: false
            }
        }
        
        return {
            isValid: true,
        };
    }
});


export const authorization = [register,authentication, authenticationRefresh, authorize];