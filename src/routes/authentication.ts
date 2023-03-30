import Joi from "joi";
import { handlerAuthentication } from "./handlers/authenticationHandler";

export = ({
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
        auth: 'simple'
    },
    handler: handlerAuthentication
});