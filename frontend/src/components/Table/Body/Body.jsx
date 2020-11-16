import React from 'react';
import TableBodyMUI from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const renderCell = (id, value) => <TableCell key={id}>{value}</TableCell>;

const renderRow = (row, columns) => {
  const { id: rowId } = row;

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowId}>
      {columns.map(({ id }) => {
        const value = row[id];

        return renderCell(id, value);
      })}
    </TableRow>
  );
};

const renderRows = (rows, columns) =>
  rows.map((row) => renderRow(row, columns));

export const TableBody = ({ rows, columns }) => (
  <TableBodyMUI>{renderRows(rows, columns)}</TableBodyMUI>
);
