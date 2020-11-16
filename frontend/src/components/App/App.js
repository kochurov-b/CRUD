import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table } from '../Table/Table';

import './App.css';

export const App = () => {
  const columns = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'actions', label: 'Actions', width: 100 },
  ];

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

  const actions = [
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
  ];

  return (
    <main className="app">
      <Table columns={columns} rows={rows} actions={actions} />
    </main>
  );
};
