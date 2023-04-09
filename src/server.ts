import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';
import { plugins } from './plugins/plugins';
import { PHost } from "./types/type";
import { connectBD } from './connectBD';
import { crudRoutes } from './routes/CRUD';
import homePage from './routes/homePage';
import { authorization } from './routes/authorization';
import { logout } from './routes/logout';
import config from './config';



// ЭТО ТОЧКА ВХОДА

// почему-то при добавление в package.json скрипта на быстрый запуск сервера, скрипт отрабатывает, сервер поднимается, но запросы при этом перестают работать.
const portHost:PHost = {
    port: 8000,
    host: 'localhost'
}

const start = async () => {
    const server:Server = Hapi.server(portHost);

    await server.register(plugins);

    await server.start();
    console.log('Сервер по адресу %s', server.info.uri);

    connectBD();
    server.state('refreshToken', {
        ttl: 60*24*60*60*100, // 60 дней жизни куки
        isSecure: true,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true
    })

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
            
    server.route([...crudRoutes, ...authorization, homePage, logout]) // передаем массив рутов. Работает
       
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();