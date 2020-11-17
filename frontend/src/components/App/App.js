import React, { useMemo, useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table } from '../Table/Table';
import { useQueryUsers } from '../../apollo/users/query/query';
import { useStyles } from './App.styles';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 30];

const COLUMNS = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Actions', width: 100 },
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
        label: 'edit',
        icon: EditIcon,
        color: 'primary',
        onClick: (id) => {
          console.log(id);
        },
      },
      {
        label: 'delete',
        icon: DeleteIcon,
        color: 'secondary',
        onClick: (id) => {
          console.log(id);
        },
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
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          getSkipRowsCount={setSkipRowsCount}
          getRowsPerPage={setRowsPerPageCount}
        />
      </div>
    </main>
  );
};
