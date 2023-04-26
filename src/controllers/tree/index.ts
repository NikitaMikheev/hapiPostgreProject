import { createTree } from '../../model/repository/tree/treeServiceCreate';

export default {
  handlerCreateTree: async (request, h): Promise<string | boolean> => {
    if (!(await createTree(request.payload.id))) {
      // если createTree нормально отрабатывает - что-то возвращаем на фронт
      return false;
    }

    console.log('Создано новое начальное звено нового древа');

    return true;
  }
};
