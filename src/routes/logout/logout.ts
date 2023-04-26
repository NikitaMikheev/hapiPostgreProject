import { type ServerRoute } from '@hapi/hapi';
import controllers from '../../controllers/authorization/';
import * as options from './options';

const routes: ServerRoute[] = [
  {
    // Рут выход из личного кабинета
    method: 'POST',
    path: '/logout',
    options: options.logout,
    handler: controllers.handlerLogout // после проверок удаление рефреш токена пользователя из бд
  }
];

export default routes;
