import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import { TableHead } from './Head/Head';
import { TableBody } from './Body/Body';
import { useTable } from './useTable';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 30];

export const Table = ({ columns, rows }) => {
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
  const rowsCount = rows.length;
  const startRowNumber = page * rowsPerPage;
  const endRowNumber = page * rowsPerPage + rowsPerPage;
  const generatePageRows = rows.slice(startRowNumber, endRowNumber);

  return (
    <Paper>
      <TableContainer>
        <TableMUI>
          <TableHead columns={columns} />
          <TableBody columns={columns} rows={generatePageRows} />
        </TableMUI>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};
