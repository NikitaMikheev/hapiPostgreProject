import { functionPut } from "./routesMethod/functionPut";
import Joi from "joi";


export = ({
    method: 'PUT', 
    path: `/put/{id}`, // изменяем пользователя по запросу (например, через Insomnia), в качестве параметров - id, для определения пользователя. Через квери параметры передаем изменения в порядке: имя, фамилия, почта, пароль, возраст
    options: {
        description: 'Put запрос',
        notes: 'Изменяет пользователя',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().description('ID пользователя')
            }),
            query: Joi.object({
                userName: Joi.string().description('Имя пользователя'),
                userLastName: Joi.string().description('Фамилия пользователя'),
                userEmail: Joi.string().description('E-mail пользователя'),
                userPass: Joi.string().description('Пароль пользователя'),
                userAge: Joi.number().description('Возраст пользователя')
            }),
        },
    },
    handler: async function (request, h) {
        try {
            const ID = request.params.id;

            if(await functionPut(ID, request.query)) {
                return 'Такого пользователя не существует!';
            }
            return 'Изменения сохранены!';
        }
        catch(error) {
            console.log('Ошибка PUT запроса');
            console.log(error);
            
        }
    }
});