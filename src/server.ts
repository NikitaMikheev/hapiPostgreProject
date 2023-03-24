import * as Hapi from '@hapi/hapi';
import * as inert from '@hapi/inert';
import * as Swagger from 'hapi-swagger';
import * as Vision from '@hapi/vision';
import { PHost } from "./types/type";
import { connectBD } from './connectBD';
import * as filepaths from 'filepaths';


// ЭТО ТОЧКА ВХОДА

// почему-то при добавление в package.json скрипта на быстрый запуск сервера, скрипт отрабатывает, сервер поднимается, но запросы при этом перестают работать.
const portHost:PHost = {
    port: 8000,
    host: 'localhost'
}

const start = async () => {
    const server = Hapi.server(portHost);

    const swaggerOptions: Swagger.RegisterOptions = { // настройка сваггера
        info: {
            title: 'Тест',
        }
    };

    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
        {
            plugin: inert
        },

        {
            plugin: Vision
        },

        {
            plugin: Swagger,
            options: swaggerOptions
        }
    ]

    await server.register(plugins);

    await server.start();
    console.log('Сервер по адресу %s', server.info.uri);

    connectBD();

    let routes = filepaths.getSync(__dirname + '/routes/', {ignore: 'routesMethod'}); // рекурсивно обходим с помощью утилиты папку с рутами, игонируем папку routesMethod
    for (let route of routes)
        server.route(require(route)) // передаем массив рутов. Работает
       
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();