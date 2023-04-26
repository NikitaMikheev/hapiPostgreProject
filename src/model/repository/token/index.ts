import { AppDataSource } from '../../../data-source';
import { User } from '../../entity/User';
import * as Crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { type Tokens, type RefreshToken } from '../../../types/type';

const UserTokens = {
  validate: async (eAdress: string, password: string): Promise<false | Tokens> => {
    const users = AppDataSource.getRepository(User);
    const user = await users.findOneBy({
      email: eAdress
    });

    if (user === null) {
      return false;
    }

    const pass = Crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex'); // хешируем пароль

    if (pass === user.password) {
      const accessToken: string = jwt.sign(
        {
          aud: 'urn:audience:test',
          iss: 'urn:issuer:test',
          id: user.id,
          scope: user.role,
          sub: false,
          maxAgeSec: 600, // 10 минут жизни токена
          timeSkewSec: 15
        },
        config.secret
      );

      const refreshToken: string = jwt.sign(
        {
          aud: 'urn:audience:test',
          iss: 'urn:issuer:test',
          id: user.id,
          scope: user.role,
          sub: false,
          timeSkewSec: 15
        },
        config.refresh,
        { expiresIn: '60d' }
      ); // рефреш токен живет 60 дней

      user.refreshToken = refreshToken;
      await users.save(user);
      return {
        accessToken,
        refreshToken // возвращает на клиент 2 токена. Аксесс для доступа. Когда он протухает, с клиента по руту authentication/refresh будет направлен рефреш токен, который сгенерирует новый акссес и рефреш токен и вернет это на клиент
      };
    }

    return false;
  },

  validateRefresh: async (token: string): Promise<false | Tokens> => {
    const decodedData: RefreshToken = jwt.verify(token, config.refresh); // декодируем токен, подставляя в него ключ

    if (Boolean(decodedData) === undefined) {
      // если рефреш токен просрочен, тогда вернёт false. Потребуется заново авторизироваться
      return false;
    }

    const users = AppDataSource.getRepository(User);

    const user = await users.findOneBy({
      id: decodedData.id
    });

    if (user === null) {
      return false;
    }

    if (token === user.refreshToken) {
      const accessToken = jwt.sign(
        {
          aud: 'urn:audience:test',
          iss: 'urn:issuer:test',
          id: user.id,
          scope: user.role,
          sub: false,
          maxAgeSec: 600, // 10 минут жизни токена
          timeSkewSec: 15
        },
        'secretAccess'
      );

      const refreshToken = jwt.sign(
        {
          aud: 'urn:audience:test',
          iss: 'urn:issuer:test',
          id: user.id,
          scope: user.role,
          sub: false,
          timeSkewSec: 15
        },
        'secretRefresh',
        { expiresIn: '60d' }
      ); // рефреш токен живет 60 дней

      user.refreshToken = refreshToken;
      await users.save(user);
      return {
        accessToken,
        refreshToken // возвращает на клиент обновленные токены
      };
    }

    return false;
  },

  tokenDelete: async (token: string): Promise<boolean> => {
    const decodedData: RefreshToken = jwt.verify(token, config.refresh); // декодируем токен, подставляя в него ключ

    if (Boolean(decodedData) === undefined) {
      // если рефреш токен просрочен, тогда вернёт false.
      return false;
    }

    const users = AppDataSource.getRepository(User);

    const user = await users.findOneBy({
      id: decodedData.id
    });

    if (user === null) {
      return false;
    }

    if (token === user.refreshToken) {
      // после всех проверок удаляем токен из базы данных. Пользователь разлогинился
      user.refreshToken = null;
      await users.save(user);
      return true;
    }

    return false;
  }
};

export default UserTokens;
