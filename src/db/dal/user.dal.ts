import User, { IUser } from '../models/User.model';

export const create = async (newUser: IUser): Promise<IUser> => {
  const user = new User(newUser);
  await User.create(user);
  return user;
};

export const getByName = async (name: string): Promise<IUser | undefined> => {
  const query = await User.find({ username: name }).exec();

  return query[0];
};

export const verifyPass = async (userToVerify: IUser, password: string): Promise<boolean> => {
  const user = new User(userToVerify);
  return user.verifyPassword(password);
};
