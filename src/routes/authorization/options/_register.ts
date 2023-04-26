import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const register: RouteOptions = {
  description: 'Регистрация пользователя',
  notes: 'Регистрирует пользователя, добавляет его в бд',
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
      userPassConfm: Joi.string().description('Подтверждение пароля'),
      userAge: Joi.number().description('Возраст пользователя'),
      userCity: Joi.string().description('Город пользователя')
    })
  }
};
