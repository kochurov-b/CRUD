import { User } from '../../models/Users';

const getUserById = async (_, { id }) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (_, { skip, limit }) => {
  try {
    return await User.find(null, null, { skip, limit });
  } catch (error) {
    console.error('error', error);
  }
};

export const query = {
  user: getUserById,
  users: getUsers,
};
