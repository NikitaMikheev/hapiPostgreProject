import Joi from "joi";

export = ({
    method: "GET",
    path: "/authentication",
    options: {
        description: 'Авторизация',
        notes: 'Авторизация по email и паролю',
        tags: ['api'],
        validate: {
            query: Joi.object({
                email: Joi.string().description('Email пользователя'),
                password: Joi.string().description('Пароль пользователя'),
            })
        },
        auth: 'simple'
    },
    handler: function (request, h) {
      return 'Добро пожаловать';
    }
});