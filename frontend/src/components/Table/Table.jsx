import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

import { TableHead } from './Head/Head';
import { TableBody } from './Body/Body';

export const Table = ({ columns, rows }) => {
  return (
    <Paper>
      <TableContainer>
        <TableMUI>
          <TableHead columns={columns} />
          <TableBody columns={columns} rows={rows} />
        </TableMUI>
      </TableContainer>
    </Paper>
  );
};
