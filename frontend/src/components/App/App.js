import React from 'react';

import { useApp } from './App.hook';
import { Table } from '../Table/Table';

export const App = () => {
  const {
    classes,
    actions,
    columns,
    usersData,
    usersLoading,
    usersTotalCount,
    userData,
    userLoading,
    formFields,
    setSkipRowsCount,
    setRowsPerPageCount,
    rowsPerPageOptions,
    dialogFetchEntityData,
    onAdd,
  } = useApp();

  return (
    <main className={classes.app}>
      <div className={classes.container}>
        <Table
          columns={columns}
          rows={usersData}
          actions={actions}
          loading={usersLoading}
          totalCount={usersTotalCount}
          formFields={formFields}
          dialogTitle={'User adding / updating'}
          dialogContentText={'Here you can create or edit an existing user!'}
          dialogFetchEntityData={dialogFetchEntityData}
          dialogLoading={userLoading}
          dialogData={userData}
          rowsPerPageOptions={rowsPerPageOptions}
          getSkipRowsCount={setSkipRowsCount}
          getRowsPerPage={setRowsPerPageCount}
          onAdd={onAdd}
        />
      </div>
    </main>
  );
};
