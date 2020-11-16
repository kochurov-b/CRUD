import React from 'react';

import { Table } from '../Table/Table';

import './App.css';

export const App = () => {
  const columns = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
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

  return (
    <main className="app">
      <Table columns={columns} rows={rows} />
    </main>
  );
};
