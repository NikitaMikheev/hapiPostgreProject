import UserTokens from '../../model/repository/token';
import UserRepository from '../../model/repository/CRUD';
import { type myUser, type Tokens } from '../../types/type';

export default {
  handlerRegister: async (request, h): Promise<false | Tokens> => {
    // добавление пользователя через форму
    try {
      const formObj: myUser = {
        firstName: request.payload.userName,
        lastName: request.payload.userLastName,
        userEmail: request.payload.userEmail,
        userPass: request.payload.userPass,
        userPassConfm: request.payload.userPassConfm,
        age: parseInt(request.payload.userAge),
        city: request.payload.userCity
      };

      const res = await UserRepository.create(formObj); // пользователь добавлен в бд

      if (!res) {
        return false;
      }

      const token: false | Tokens = await UserTokens.validate(formObj.userEmail, formObj.userPass); // проверяем и возвращаем сразу 2 токена

      if (token !== false) {
        h.state('refreshToken', { refreshToken: token.refreshToken }); // сохраняем в куки рефреш токен
      }

      return token;
    } catch (error) {
      console.log('Ошибка POST запроса');
      console.log(error);
      return false;
    }
  },

  handlerAuthentication: async (request, h): Promise<false | Tokens> => {
    const token: false | Tokens = await UserTokens.validate(request.payload.email, request.payload.password);
    await h.unstate('refreshToken'); // очищаем куки (на случай, если остался старый токен)

    if (token !== false) {
      h.state('refreshToken', { refreshToken: token.refreshToken }); // сохраняем в куки новый рефреш токен
    }

    return token; // на клиент возвращается токен. Далее через запрос по маршруту login клиент передает токен в заголовке.
  },

  handlerRefreshAuthentication: async (request, h): Promise<false | Tokens> => {
    const token: false | Tokens = await UserTokens.validateRefresh(request.payload.token);
    await h.unstate('refreshToken'); // очищаем куки (на случай, если остался старый токен)

    if (token !== false) {
      h.state('refreshToken', { refreshToken: token.refreshToken }); // сохраняем в куки новый рефреш токен
    }

    return token; // на клиент возвращается обновленный refrhesh и access токены.
  },

  handlerLogout: async (request, h): Promise<boolean> => {
    const res = await UserTokens.tokenDelete(request.payload.token);
    return res;
  }
};
