import Hapi from '@hapi/hapi';
import { plugins } from './plugins/plugins';
import { PHost } from "./types/type";
import { connectBD } from './connectBD';
import { crudRoutes } from './routes/CRUD';
import homePage from './routes/homePage';
import authentication from './routes/authentication';
import { validate } from './model/bdMethod/functionValidate';


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
    
    server.auth.strategy('simple', 'basic', {validate});
    server.route([...crudRoutes, homePage, authentication]) // передаем массив рутов. Работает
       
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();