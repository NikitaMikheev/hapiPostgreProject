import Hapi from '@hapi/hapi';
import { type Server } from '@hapi/hapi';
import { plugins } from './plugins/plugins';
import { type PHost } from './types/type';
import { connectBD } from './connectBD';
import { crudRoutes } from './routes/CRUD';
import homePage from './routes/homePage';
import { authorization } from './routes/authorization';
import { logout } from './routes/logout';
import config from './config';
import { AppDataSource } from './data-source';
import { User } from './model/entity/User';

// ЭТО ТОЧКА ВХОДА

// почему-то при добавление в package.json скрипта на быстрый запуск сервера, скрипт отрабатывает, сервер поднимается, но запросы при этом перестают работать.
const portHost: PHost = {
  port: 8000,
  host: 'localhost'
};

const start = async (): Promise<void> => {
  const server: Server = Hapi.server(portHost);

  await server.register(plugins);

  await server.start();
  console.log('Сервер по адресу %s', server.info.uri);

  connectBD();
  server.state('refreshToken', {
    ttl: 60 * 24 * 60 * 60 * 100, // 60 дней жизни куки
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: true
  });

  server.auth.strategy('jwt_token', 'jwt', {
    keys: config.secret,
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 600, // 10 минут жизни
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      const users = AppDataSource.getRepository(User);

      const user = await users.findOneBy({
        id: artifacts.decoded.payload.id
      });

      if (user === null || user.refreshToken === null) {
        // проверяем есть ли у пользователя рефреш токен (если нет, то он разлогинен)
        return {
          isValid: false
        };
      }

      return {
        isValid: true
      };
    }
  });

  server.route([...crudRoutes, ...authorization, homePage, logout]); // передаем массив рутов. Работает
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

void start();
