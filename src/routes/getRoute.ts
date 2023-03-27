import Joi from "joi";
import { functionGet } from "./routesMethod/functionGet";


export = ({ // Ищет по ID. Можно переделать под поиск любого поля
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
    handler: async function (request, h) {
        try {
            try {
                const user = JSON.parse(await functionGet(request.query.id));
                console.log(`Пользователь получен: ${user.firstName} ${user.lastName}`);
            
                return `Имя: ${user.firstName} <br> Фамилия: ${user.lastName} <br> E-mail: ${user.userEmail} <br> Возраст: ${user.age}`;
            }
            catch {
                return 'Такого пользователя не существует!';
            }

        }

        catch(error) {
            console.log('Ошибка GET запроса');
            console.log(error);
        }
    }
});