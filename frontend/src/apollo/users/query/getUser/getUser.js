import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_USER_BY_ID } from './getUser.query';

export const useQueryGetUserById = () => {
  const [handlerGetUserById, { loading, error, data }] = useLazyQuery(
    GET_USER_BY_ID,
  );
  const userData = data ? data.user : null;

  const getUserById = useCallback(
    (id) => {
      const variables = { id };

      handlerGetUserById({
        variables,
      });
    },
    [handlerGetUserById],
  );

  return { loading, error, userData, getUserById };
};
