import { AppDataSource } from '../../data-source';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { type Tokens, type RefreshToken } from '../../types/type';

export const validateRefresh = async (token: string): Promise<false | Tokens> => {
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
};
