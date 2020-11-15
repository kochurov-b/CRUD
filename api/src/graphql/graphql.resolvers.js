import { scalarsTypes } from './helpers/scalars/scalars';
import { query as usersQuery } from './Users/Users.query';

export const resolvers = {
  Query: {
    ...usersQuery,
  },
  ...scalarsTypes,
};
