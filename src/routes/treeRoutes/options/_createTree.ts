import { type RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const createTree: RouteOptions = {
  description: 'Создание древа',
  notes: 'Создание древа',
  tags: ['api'],
  auth: {
    strategy: 'jwt_token',
    scope: 'user'
  },
  validate: {
    payload: Joi.object({
      id: Joi.number().description('ID пользователя') // с фронта получаем id авторизированного пользователя вокруг которого начинаем выстраивать древо
    })
  }
};
