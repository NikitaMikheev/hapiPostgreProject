import { myUser } from "../types/type";
import { functionPost } from "./routesMethod/functionPost";

export = ({
    method: 'POST',
    path: '/post',
    options: {
        description: 'Post запрос',
        notes: 'Добавляет пользователя',
        tags: ['api']
    },
    handler: function (request, h) { // добавление пользователя через форму 
        try {
            const payload:any = request.payload;

            let formObj:myUser = {
                firstName: payload.userName,
                lastName: payload.userLastName,
                userEmail: payload.userEmail,
                userPass: payload.userPass,
                age: parseInt(payload.userAge)
            }
        
            functionPost(formObj);

            return h.file('form.html');
        }

        catch(error) {
            console.log('Ошибка POST запроса');
            console.log(error);
        }
    }
});