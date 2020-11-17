import { useLazyQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

const DEFAULT_USERS_DATA = { users: { users: [], totalCount: 0 } };

export const useQueryUsers = () => {
  const [getUsers, { loading, error, data }] = useLazyQuery(
    loader('./query.graphql'),
  );
  const users = data ? data : DEFAULT_USERS_DATA;

  return { ...users, loading, error, getUsers };
};
