import { notFound, unauthorized } from '@hapi/boom';
import { IUser } from '../db/models/User.model';
import { create, getByName, verifyPass } from '../db/dal/user.dal';
import Logger from '../utils/logger';

export default class UserService {
  static async createUser(newUser: IUser): Promise<IUser> {
    const createdUser = await create(newUser);

    Logger.info('Successfully created new user', createdUser);

    return createdUser;
  }

  static async validateUserCredentials(credentialName: string, credentialPassword: string): Promise<boolean> {
    const user = await getByName(credentialName);

    if (!user) {
      throw notFound();
    }

    const isValidUser = await verifyPass(user, credentialPassword);
    if (!isValidUser) {
      throw unauthorized();
    }

    Logger.info('Successfully validated user credentials', user);

    return true;
  }
}
