import { useMutation } from '@apollo/react-hooks';

import { UPDATE_USER } from './updateUser.query';

export const useMutationUpdateUser = () => {
  const [handlerUpdateUser, { loading, error, data }] = useMutation(
    UPDATE_USER,
  );
  const updatedUser = data ? data.updateUser : null;

  const updateUser = ({ id, name, email }) => {
    const variables = { id, input: { name, email } };

    handlerUpdateUser({
      variables,
    });
  };

  return { loading, error, updatedUser, updateUser };
};
