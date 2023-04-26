import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const get: RouteOptions = {
  description: 'Get запрос',
  notes: 'Запрос пользователя по ID',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'user'
  },
  validate: {
    query: Joi.object({
      id: Joi.number().description('ID пользователя')
    })
  }
};
