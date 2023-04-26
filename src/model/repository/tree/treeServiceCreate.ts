import { AppDataSource } from '../../../data-source';
import { User } from '../../entity/User';
import { UserTree } from '../../entity/UserTree';
import { type TUserTree } from '../../../types/type';

export const createTree = async (ID: number): Promise<boolean> => {
  const userRep = AppDataSource.getRepository(User);
  const userGet = await userRep.findOneBy({
    id: ID
  });

  if (userGet === null) {
    return false;
  }

  const userTree: TUserTree = new UserTree();

  userTree.firstName = userGet.firstName;
  userTree.lastName = userGet.lastName;

  await AppDataSource.manager.save(userTree);
  return true;
};
