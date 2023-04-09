import Joi from "joi";
import { ServerRoute, ReqRefDefaults } from "@hapi/hapi";
import { handlerLogout } from "./controllers/authorizationController";

export const logout:ServerRoute<ReqRefDefaults> = ({ // Рут выход из личного кабинета
    method: "POST",
    path: "/logout",
    options: {
        description: 'Logout',
        notes: 'Передает рефреш токен для выхода из личного кабинета',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: Joi.object({
                token: Joi.string().description('Refresh token пользователя'),
            })
        },
    },
    handler: handlerLogout // после проверок удаление рефреш токена пользователя из бд 
});
