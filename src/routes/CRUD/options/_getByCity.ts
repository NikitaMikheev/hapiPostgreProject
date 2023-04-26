import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const getByCity: RouteOptions = {
  description: 'Get запрос',
  notes: 'Поиск всех пользователей из конкретного города',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'user'
  },
  validate: {
    query: Joi.object({
      city: Joi.string().description('Город пользователя')
    })
  }
};
