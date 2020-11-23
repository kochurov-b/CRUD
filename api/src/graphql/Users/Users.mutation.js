import { User } from '../../models/User';
import { setNotification } from '../helpers/notification.helper';
import { SET_NOTIFICATION } from '../Notification/Notification.constants';

const createUser = async (_, { input: userData }, { pubSub }) => {
  try {
    const user = new User(userData);
    const { name } = user;

    await user.save();

    pubSub.publish(SET_NOTIFICATION, {
      ...setNotification(`New user "${name}" has been added!`),
    });

    return user;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (_, { id, input: updated }, { pubSub }) => {
  try {
    const conditions = { _id: id };
    const updatedUser = await User.findByIdAndUpdate(conditions, updated);
    const { name } = updatedUser;

    pubSub.publish(SET_NOTIFICATION, {
      ...setNotification(`User "${name}" was updated!`),
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (_, { id }, { pubSub }) => {
  try {
    const conditions = { _id: id };
    const deletedUser = await User.findByIdAndDelete(conditions);
    const { name } = deletedUser;

    pubSub.publish(SET_NOTIFICATION, {
      ...setNotification(`User "${name}" was removed!`),
    });

    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

export const mutation = {
  createUser,
  updateUser,
  deleteUser,
};
