import { useMutation } from '@apollo/react-hooks';

import { DELETE_USER } from './deleteUser.query';

const update = (cache) => {
  cache.modify({
    fields: {
      users: (existingUsersRefs, { DELETE }) => DELETE,
    },
  });
};

export const useMutationDeleteUser = () => {
  const [handlerDeleteUser, { loading, error, data }] = useMutation(
    DELETE_USER,
  );
  const deletedUser = data ? data.deleteUser : null;

  const deleteUser = (id) => {
    const variables = { id };

    handlerDeleteUser({
      variables,
      update,
    });
  };

  return { loading, error, deletedUser, deleteUser };
};
