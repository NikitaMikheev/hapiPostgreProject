import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const authentication: RouteOptions = {
  description: 'Авторизация',
  notes: 'Авторизация по email и паролю',
  tags: ['api'],
  validate: {
    payload: Joi.object({
      email: Joi.string().description('Email пользователя'),
      password: Joi.string().description('Пароль пользователя')
    })
  },
  plugins: {
    'hapi-swagger': {
      payloadType: 'form'
    }
  }
};
