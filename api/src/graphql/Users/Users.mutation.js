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

const updateUser = async (_, { id, input: updated }) => {
  try {
    const conditions = { _id: id };

    return await User.findByIdAndUpdate(
      conditions,
      updated,
      (error, result) => {
        if (error) throw Error(error);

        return result;
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export const mutation = {
  createUser,
  updateUser,
};