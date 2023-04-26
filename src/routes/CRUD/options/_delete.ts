import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const del: RouteOptions = {
  description: 'Delete запрос',
  notes: 'Удаляет пользователя',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'admin'
  },
  validate: {
    params: Joi.object({
      id: Joi.number().description('ID пользователя')
    })
  }
};
