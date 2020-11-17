import { User } from '../../models/User';

const getUserById = async (_, { id }) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (_, { skip, limit }) => {
  try {
    const users = await User.find(null, null, { skip, limit });
    const totalCount = await User.count();

    return {
      users,
      totalCount,
    };
  } catch (error) {
    console.error(error);
  }
};

export const query = {
  user: getUserById,
  users: getUsers,
};
