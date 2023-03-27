import { myUser } from "../types/type";
import { functionPost } from "./routesMethod/functionPost";
import Joi from "joi";

const resp = Joi.object({
    Name: Joi.string(),
    Surname: Joi.string()
}).label('Пользователь добавлен: ');

export = ({
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
        
        response: {schema: resp}
    },
    handler: function (request, h) { // добавление пользователя через форму 
        try {

            let formObj:myUser = {
                firstName: request.payload.userName,
                lastName: request.payload.userLastName,
                userEmail: request.payload.userEmail,
                userPass: request.payload.userPass,
                age: parseInt(request.payload.userAge)
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