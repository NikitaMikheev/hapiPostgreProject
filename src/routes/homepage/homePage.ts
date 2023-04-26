import controllers from '../../controllers/homePage/';
import * as options from './options';

export = {
  // тест swagger, все работает
  method: 'GET',
  path: '/',
  options: options.homepage,
  handler: controllers.handlerHomePage
};
