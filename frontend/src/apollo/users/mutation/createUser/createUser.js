import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from './createUser.query';

const update = ({ cache, createdUser, limit }) => {
  cache.modify({
    fields: {
      users: (existingUsersRefs, { toReference }) => {
        const { users, totalCount } = existingUsersRefs;
        const increaseTotalCount = totalCount + 1;

        if (users.length >= limit) {
          return {
            ...existingUsersRefs,
            totalCount: increaseTotalCount,
          };
        }

        return {
          ...existingUsersRefs,
          users: [...existingUsersRefs.users, toReference(createdUser)],
          totalCount: increaseTotalCount,
        };
      },
    },
  });
};

export const useMutationCreateUser = (limit) => {
  const [handlerCreateUser, { loading, error, data }] = useMutation(
    CREATE_USER,
  );
  const createdUser = data ? data.createUser : null;

  const createUser = (name, email) => {
    const variables = { input: { name, email } };

    handlerCreateUser({
      variables,
      update: (cache, { data: { createUser: createdUser } }) =>
        update({ cache, createdUser, limit }),
    });
  };

  return { loading, error, createdUser, createUser };
};
