import authorization from './authorization/authorization';
import CRUD from './CRUD/CRUD';
import logout from './logout/logout';
import createTree from './treeRoutes/createTree';
import homePage from './homepage/homePage';

export default [...authorization, ...CRUD, ...logout, ...createTree, homePage];
