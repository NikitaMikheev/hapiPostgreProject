import Joi from "joi";
import { handlerGet } from "./handlers/crudHandlers";
import { handlerPost } from "./handlers/crudHandlers";
import { handlerPut } from "./handlers/crudHandlers";
import { handlerDel } from "./handlers/crudHandlers";


const get = ({ // Ищет по ID. Можно переделать под поиск любого поля
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


const post = ({ // рут для регистрации
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
                userAge: Joi.number().description('Возраст пользователя')
            })
        },
        
    },
    handler: handlerPost
});

const put = ({
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
                userAge: Joi.number().description('Возраст пользователя')
            }),
        },
    },
    handler: handlerPut
});

const del = ({
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

export const crudRoutes = [get,post,put,del];