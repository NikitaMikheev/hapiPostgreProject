import { type ServerRoute } from '@hapi/hapi';
import controllers from '../../controllers/tree';
import * as options from './options';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/createTree',
    options: options.createTree,
    handler: controllers.handlerCreateTree
  }
];

export default routes;
