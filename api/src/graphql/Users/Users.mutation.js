import { User } from '../../models/Users';

const createUser = async (_, { input: userData }) => {
  try {
    const user = new User(userData);

    await user.save();

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const mutation = {
  createUser,
};
