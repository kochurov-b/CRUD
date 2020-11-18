import { useLazyQuery } from '@apollo/react-hooks';

import { GET_USERS } from './query.query';

const DEFAULT_USERS_DATA = { users: { users: [], totalCount: 0 } };

export const useQueryUsers = () => {
  const [getUsers, { loading, error, data }] = useLazyQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const users = data ? data : DEFAULT_USERS_DATA;

  return { ...users, loading, error, getUsers };
};
