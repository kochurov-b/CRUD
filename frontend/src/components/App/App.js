import React, { useMemo, useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table } from '../Table/Table';
import { useQueryUsers } from '../../apollo/users/query/query';
import { useQueryGetUserById } from '../../apollo/users/query/getUser/getUser';
import { useMutationCreateUser } from '../../apollo/users/mutation/createUser/createUser';
import { useMutationDeleteUser } from '../../apollo/users/mutation/deleteUser/deleteUser';
import { useMutationUpdateUser } from '../../apollo/users/mutation/updateUser/updateUser';

import { useStyles } from './App.styles';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 30];

const COLUMNS = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Actions', width: 100 },
];

const FORM_FIELDS = [
  {
    label: 'Name',
    name: 'name',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
];

export const App = () => {
  const classes = useStyles();
  const [skipRowsCount, setSkipRowsCount] = useState(0);
  const [rowsPerPageCount, setRowsPerPageCount] = useState(
    ROWS_PER_PAGE_OPTIONS[0],
  );
  const {
    loading,
    error,
    users: { users: usersData, totalCount },
    getUsers,
  } = useQueryUsers();
  const { getUserById, userData, loading: userLoading } = useQueryGetUserById();
  const { createUser } = useMutationCreateUser(rowsPerPageCount);
  const { deleteUser } = useMutationDeleteUser();
  const { updateUser } = useMutationUpdateUser();

  useEffect(() => {
    getUsers({
      variables: {
        skip: skipRowsCount,
        limit: rowsPerPageCount,
      },
    });
  }, [skipRowsCount]);

  useEffect(() => {
    getUsers({
      variables: {
        skip: 0,
        limit: rowsPerPageCount,
      },
    });
  }, [rowsPerPageCount]);

  const actions = useMemo(
    () => [
      {
        label: 'Edit',
        icon: EditIcon,
        color: 'primary',
        withDialog: true,
        onClick: ({ id, name, email }) => updateUser({ id, name, email }),
      },
      {
        label: 'Delete',
        icon: DeleteIcon,
        color: 'secondary',
        onClick: (id) => deleteUser(id),
      },
    ],
    [],
  );

  return (
    <main className={classes.app}>
      <div className={classes.container}>
        <Table
          columns={COLUMNS}
          rows={usersData}
          actions={actions}
          loading={loading}
          totalCount={totalCount}
          formFields={FORM_FIELDS}
          dialogTitle={'User adding / updating'}
          dialogContentText={'Here you can create or edit an existing user!'}
          dialogFetchEntityData={(id) => getUserById(id)}
          dialogLoading={userLoading}
          dialogData={userData}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          getSkipRowsCount={setSkipRowsCount}
          getRowsPerPage={setRowsPerPageCount}
          onAdd={({ name, email }) => createUser(name, email)}
        />
      </div>
    </main>
  );
};
