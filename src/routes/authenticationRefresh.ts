import Joi from "joi";
import { handlerRefreshAuthentication } from "./handlers/authenticationRefreshHandler";

export = ({ // Пост запрос передает рефреш токен
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