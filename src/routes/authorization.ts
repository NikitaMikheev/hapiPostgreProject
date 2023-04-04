import Joi from "joi";
import { handlerAuthentication } from "./handlers/authorizationHandlers";
import { handlerRefreshAuthentication } from "./handlers/authorizationHandlers";

const authentication = ({ // Рут аутетнтификации. Пост запрос передает логин и пароль. Рут возвращает на клиент два токена - access и refresh 
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
    handler: (artifacts,request, h) => {
        return {
            
            isValid: true,
        };
    }
});


export const authorization = [authentication, authenticationRefresh, authorize];