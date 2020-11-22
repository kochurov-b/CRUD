import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_USER } from './updateUser.query';

export const useMutationUpdateUser = () => {
  const [handlerUpdateUser, { loading, error, data }] = useMutation(
    UPDATE_USER,
  );
  const updatedUser = data ? data.updateUser : null;

  const updateUser = useCallback(
    ({ id, name, email }) => {
      const variables = { id, input: { name, email } };

      handlerUpdateUser({
        variables,
      });
    },
    [handlerUpdateUser],
  );

  return { loading, error, updatedUser, updateUser };
};
