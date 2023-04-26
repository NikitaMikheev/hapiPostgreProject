import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const logout: RouteOptions = {
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
      token: Joi.string().description('Refresh token пользователя')
    })
  }
};
