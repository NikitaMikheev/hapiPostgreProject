import { type RouteOptions } from '@hapi/hapi';

export const homepage: RouteOptions = {
  description: 'Get запрос',
  notes: 'Возвращает главную страницу',
  tags: ['api']
};
