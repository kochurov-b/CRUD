import { SET_NOTIFICATION } from './Notification.constants';

export const subscription = {
  notification: {
    subscribe: (parent, args, { pubSub }) =>
      pubSub.asyncIterator([SET_NOTIFICATION]),
  },
};
