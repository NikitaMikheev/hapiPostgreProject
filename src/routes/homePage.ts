import { handlerHomePage } from './controllers/homePageController';

export = {
  // тест swagger, все работает
  method: 'GET',
  path: '/',
  options: {
    description: 'Get запрос',
    notes: 'Возвращает главную страницу',
    tags: ['api']
  },
  handler: handlerHomePage
};
