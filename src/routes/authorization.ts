import Joi from 'joi';
import {
  handlerRegister,
  handlerAuthentication,
  handlerRefreshAuthentication
} from './controllers/authorizationController';
import { AppDataSource } from '../data-source';
import { User } from '../model/entity/User';
import { type ServerRoute, type ReqRefDefaults } from '@hapi/hapi';

const register: ServerRoute<ReqRefDefaults> = {
  // рут для регистрации
  method: 'POST',
  path: '/register',
  options: {
    description: 'Регистрация пользователя',
    notes: 'Регистрирует пользователя, добавляет его в бд',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        payloadType: 'form'
      }
    },
    validate: {
      payload: Joi.object({
        userName: Joi.string().description('Имя пользователя'),
        userLastName: Joi.string().description('Фамилия пользователя'),
        userEmail: Joi.string().description('E-mail пользователя'),
        userPass: Joi.string().description('Пароль пользователя'),
        userPassConfm: Joi.string().description('Подтверждение пароля'),
        userAge: Joi.number().description('Возраст пользователя'),
        userCity: Joi.string().description('Город пользователя')
      })
    }
  },
  handler: handlerRegister
};

const authentication: ServerRoute<ReqRefDefaults> = {
  // Рут аутентификации. Пост запрос передает логин и пароль. Рут возвращает на клиент два токена - access и refresh
  method: 'POST',
  path: '/authentication',
  options: {
    description: 'Авторизация',
    notes: 'Авторизация по email и паролю',
    tags: ['api'],
    validate: {
      payload: Joi.object({
        email: Joi.string().description('Email пользователя'),
        password: Joi.string().description('Пароль пользователя')
      })
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form'
      }
    }
  },
  handler: handlerAuthentication // После аутентификации возвращает токен на клиент.
};

const authenticationRefresh: ServerRoute<ReqRefDefaults> = {
  // Рут на обновление refresh токена после протухания токена access. Пост запрос передает рефреш токен, в теле которого вшит id пользователя
  method: 'POST',
  path: '/authentication/refresh',
  options: {
    description: 'Рефреш токена',
    notes: 'Передает рефреш токен для обновления токенов',
    tags: ['api'],
    validate: {
      payload: Joi.object({
        token: Joi.string().description('Refresh token пользователя')
      })
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form'
      }
    }
  },

  handler: handlerRefreshAuthentication // Вовзращает на клиент обновленные токены
};

const authorize = {
  // Рут на авторизацию со стратегией 'jwt_token'. Принимает с клиента access токен. Если токен валидируется - авторизирован. (При типе ServerRoute<ReqRefDefaults> ругается на payload)
  method: 'POST',
  path: '/login',
  options: {
    description: 'Вход',
    notes: 'Вход',
    tags: ['api'],
    auth: 'jwt_token'
  },
  handler: async (artifacts, request, h) => {
    const users = AppDataSource.getRepository(User);

    const user = await users.findOneBy({
      id: artifacts.auth.artifacts.decoded.payload.id
    });

    if (user === null || user.refreshToken === null) {
      // проверяем есть ли у пользователя рефреш токен (если нет, то он разлогинен)
      return {
        isValid: false
      };
    }

    return {
      isValid: true
    };
  }
};

export const authorization: Array<ServerRoute<ReqRefDefaults>> = [
  register,
  authentication,
  authenticationRefresh,
  authorize
];
