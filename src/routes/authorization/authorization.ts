import controllers from '../../controllers/authorization/';
import * as options from './options';
import { type ServerRoute } from '@hapi/hapi';

const routes: ServerRoute[] = [
  {
    // рут для регистрации
    method: 'POST',
    path: '/register',
    options: options.register,
    handler: controllers.handlerRegister
  },
  {
    // Рут аутентификации. Пост запрос передает логин и пароль. Рут возвращает на клиент два токена - access и refresh
    method: 'POST',
    path: '/authentication',
    options: options.authentication,
    handler: controllers.handlerAuthentication // После аутентификации возвращает токен на клиент.
  },
  {
    // Рут на обновление refresh токена после протухания токена access. Пост запрос передает рефреш токен, в теле которого вшит id пользователя
    method: 'POST',
    path: '/authentication/refresh',
    options: options.authenticationRefresh,

    handler: controllers.handlerRefreshAuthentication // Вовзращает на клиент обновленные токены
  }
];

export default routes;
