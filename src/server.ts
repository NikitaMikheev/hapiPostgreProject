import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import Swagger from 'hapi-swagger';
import Vision from '@hapi/vision';
import { PHost } from "./types/type";
import { connectBD } from './connectBD';
import deleteRoute  from './routes/deleteRoute';
import putRoute from './routes/putRoute';
import getRoute from './routes/getRoute';
import postRoute from './routes/postRoute';
import homePage from './routes/homePage';


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
        },
    ]

    await server.register(plugins);

    await server.start();
    console.log('Сервер по адресу %s', server.info.uri);

    connectBD();

    server.route([deleteRoute, putRoute, postRoute, getRoute, homePage]) // передаем массив рутов. Работает
       
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();