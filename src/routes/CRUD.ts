import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { handlerGet } from "./controllers/userController";
import { handlerPost } from "./controllers/userController";
import { handlerPut } from "./controllers/userController";
import { handlerDel } from "./controllers/userController";


const get:ServerRoute<ReqRefDefaults> = ({ // Ищет по ID. Можно переделать под поиск любого поля
    method: 'GET',
    path: '/get',
    options: {
        description: 'Get запрос',
        notes: 'Запрос пользователя по ID',
        tags: ['api'],
        validate: {
            query: Joi.object({
                id: Joi.number().description('ID пользователя')
            })
        },
    },
    handler: handlerGet
});


const post:ServerRoute<ReqRefDefaults> = ({ // рут для регистрации
    method: 'POST',
    path: '/post',
    options: {
        description: 'Post запрос',
        notes: 'Добавляет пользователя',
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
                userAge: Joi.number().description('Возраст пользователя'),
                userCity: Joi.string().description('Город пользователя')
            })
        },
        
    },
    handler: handlerPost
});

const put:ServerRoute<ReqRefDefaults> = ({
    method: 'PUT', 
    path: `/put/{id}`, // изменяем пользователя по запросу (например, через Insomnia), в качестве параметров - id, для определения пользователя. Через квери параметры передаем изменения в порядке: имя, фамилия, почта, пароль, возраст
    options: {
        description: 'Put запрос',
        notes: 'Изменяет пользователя',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            params: Joi.object({
                id: Joi.number().description('ID пользователя')
            }),
            payload: Joi.object({
                userName: Joi.string().description('Имя пользователя'),
                userLastName: Joi.string().description('Фамилия пользователя'),
                userEmail: Joi.string().description('E-mail пользователя'),
                userPass: Joi.string().description('Пароль пользователя'),
                userAge: Joi.number().description('Возраст пользователя'),
                userCity: Joi.number().description('Город пользователя')
            }),
        },
    },
    handler: handlerPut
});

const del:ServerRoute<ReqRefDefaults> = ({
    method: 'DELETE', 
    path: `/delete/{id}`,
    options: {
        description: 'Delete запрос',
        notes: 'Удаляет пользователя',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().description('ID пользователя')
            })
        },

    },
    handler: handlerDel
})

export const crudRoutes: ServerRoute<ReqRefDefaults>[] = [get,post,put,del];