import { functionDel } from "./routesMethod/functionDelete";

export = ({
    method: 'DELETE', 
    path: `/delete/{id}`,
    options: {
        description: 'Delete запрос',
        notes: 'Удаляет пользователя',
        tags: ['api']
    },
    handler: function (request, h) { // удаляем пользователя по запросу (например, через Insomnia), в качестве параметров (через /) передаем id
        try {
            const ID = request.params.id;
            functionDel(ID);
            console.log("Пользователь удален!");
            return h.file('form.html');
        }

        catch(error) {
            console.log('Ошибка DELETE запроса');
            console.log(error);
        }
    }
})