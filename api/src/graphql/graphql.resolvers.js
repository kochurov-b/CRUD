import { scalarsTypes } from './helpers/scalars/scalars';
import { query as usersQuery } from './Users/Users.query';
import { mutation as usersMutation } from './Users/Users.mutation';
import { subscription as notificationSub } from './Notification/Notification.subscription';

export const resolvers = {
  Query: {
    ...usersQuery,
  },
  Mutation: {
    ...usersMutation,
  },
  Subscription: {
    ...notificationSub,
  },
  ...scalarsTypes,
};
