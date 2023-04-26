import { type ServerRoute } from '@hapi/hapi';
import controllers from '../../controllers/CRUD/';
import * as options from './options';

const routes: ServerRoute[] = [
  {
    // Ищет по ID. Можно переделать под поиск любого поля
    method: 'GET',
    path: '/get',
    options: options.get,
    handler: controllers.handlerGet
  },
  {
    // Ищет всех пользователей в конкретном городе
    method: 'GET',
    path: '/getByCity',
    options: options.getByCity,
    handler: controllers.handlerGetALLByCity
  },
  {
    // рут для регистрации
    method: 'POST',
    path: '/post',
    options: options.post,
    handler: controllers.handlerPost
  },
  {
    method: 'PUT',
    path: `/put/{id}`, // изменяем пользователя по запросу (например, через Insomnia), в качестве параметров - id, для определения пользователя. Через квери параметры передаем изменения в порядке: имя, фамилия, почта, пароль, возраст
    options: options.put,
    handler: controllers.handlerPut
  },
  {
    method: 'DELETE',
    path: `/delete/{id}`,
    options: options.del,
    handler: controllers.handlerDel
  }
];

export default routes;
