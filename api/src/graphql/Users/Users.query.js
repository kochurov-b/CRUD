import { User } from '../../models/User';
import { setNotification } from '../helpers/notification.helper';
import { SET_NOTIFICATION } from '../Notification/Notification.constants';

const getUserById = async (parent, { id }, { pubSub }) => {
  try {
    return await User.findById(id);
  } catch (error) {
    pubSub.publish(SET_NOTIFICATION, {
      ...setNotification(error.message, 'error'),
    });
    console.error(error);
  }
};

const getUsers = async (parent, { skip, limit }, { pubSub }) => {
  try {
    const users = await User.find(null, null, { skip, limit });
    const totalCount = await User.countDocuments();

    return {
      users,
      totalCount,
    };
  } catch (error) {
    pubSub.publish(SET_NOTIFICATION, {
      ...setNotification(error.message, 'error'),
    });
    console.error(error);
  }
};

export const query = {
  user: getUserById,
  users: getUsers,
};
