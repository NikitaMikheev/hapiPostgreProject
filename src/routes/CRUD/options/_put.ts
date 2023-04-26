import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const put: RouteOptions = {
  description: 'Put запрос',
  notes: 'Изменяет пользователя',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'admin'
  },
  plugins: {
    'hapi-swagger': {
      payloadType: 'form'
    }
  },
  validate: {
    params: Joi.object({
      id: Joi.number().description('ID пользователя')
    }),
    payload: Joi.object({
      userName: Joi.string().description('Имя пользователя'),
      userLastName: Joi.string().description('Фамилия пользователя'),
      userEmail: Joi.string().description('E-mail пользователя'),
      userPass: Joi.string().description('Пароль пользователя'),
      userAge: Joi.number().description('Возраст пользователя'),
      city: Joi.string().description('Город пользователя')
    })
  }
};
