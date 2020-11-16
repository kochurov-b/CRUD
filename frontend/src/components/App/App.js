import React, { useMemo } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table } from '../Table/Table';
import { useStyles } from './App.styles';

export const App = () => {
  const classes = useStyles();

  const columns = useMemo(
    () => [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'actions', label: 'Actions', width: 100 },
    ],
    [],
  );

  const rows = [
    {
      id: 'sfsfksjfksfjdf',
      name: 'Andrey',
      email: 'andrey@mail.ru',
    },
    {
      id: 'dsfsdf',
      name: 'Andrey',
      email: 'andrey@mail.ru',
    },
    {
      id: 'sdfsdfsdfsdfdsf',
      name: 'Andrey',
      email: 'andrey@mail.ru',
    },
  ];

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
        <Table columns={columns} rows={rows} actions={actions} />
      </div>
    </main>
  );
};
