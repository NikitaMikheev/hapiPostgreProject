import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const post: RouteOptions = {
  description: 'Post запрос',
  notes: 'Добавляет пользователя',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'user'
  },
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
      userAge: Joi.number().description('Возраст пользователя'),
      userCity: Joi.string().description('Город пользователя')
    })
  }
};
