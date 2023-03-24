import { functionPut } from "./routesMethod/functionPut";


export = ({
    method: 'PUT', 
    path: `/put/{id}`, // изменяем пользователя по запросу (например, через Insomnia), в качестве параметров - id, для определения пользователя. Через квери параметры передаем изменения в порядке: имя, фамилия, почта, пароль, возраст
    options: {
        description: 'Put запрос',
        notes: 'Изменяет пользователя',
        tags: ['api']
    },
    handler: function (request, h) {
        try {
            const ID = request.params.id;

            functionPut(ID, request.query);
            return 'Изменения сохранены!';
        }
        catch(error) {
            console.log('Ошибка PUT запроса');
            console.log(error);
            
        }
    }
});