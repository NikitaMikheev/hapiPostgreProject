import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const authenticationRefresh: RouteOptions = {
  description: 'Рефреш токена',
  notes: 'Передает рефреш токен для обновления токенов',
  tags: ['api'],
  validate: {
    payload: Joi.object({
      token: Joi.string().description('Refresh token пользователя')
    })
  },
  plugins: {
    'hapi-swagger': {
      payloadType: 'form'
    }
  }
};
