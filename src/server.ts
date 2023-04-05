import Hapi from '@hapi/hapi';
import { plugins } from './plugins/plugins';
import { PHost } from "./types/type";
import { connectBD } from './connectBD';
import { crudRoutes } from './routes/userController';
import homePage from './routes/homePageController';
import { authorization } from './routes/authorizationController';
import config from './config';


// ЭТО ТОЧКА ВХОДА

// почему-то при добавление в package.json скрипта на быстрый запуск сервера, скрипт отрабатывает, сервер поднимается, но запросы при этом перестают работать.
const portHost:PHost = {
    port: 8000,
    host: 'localhost'
}

const start = async () => {
    const server = Hapi.server(portHost);

    await server.register(plugins);

    await server.start();
    console.log('Сервер по адресу %s', server.info.uri);

    connectBD();

    server.auth.strategy('jwt_token', 'jwt',
        {keys: config.secret,
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 600, // 10 минут жизни
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });
            
    server.route([...crudRoutes, ...authorization, homePage]) // передаем массив рутов. Работает
       
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();