import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHeadMUI from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const renderCell = ({ id, label }) => <TableCell key={id}>{label}</TableCell>;

const renderRow = (columns) => <TableRow>{columns.map(renderCell)}</TableRow>;

export const TableHead = ({ columns }) => (
  <TableHeadMUI>{renderRow(columns)}</TableHeadMUI>
);
