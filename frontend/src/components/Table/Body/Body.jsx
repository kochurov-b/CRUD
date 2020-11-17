import React, { memo } from 'react';
import TableBodyMUI from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './Body.styles';

const renderAction = (rowId, { label, color, icon: Icon, onClick }) => (
  <IconButton
    key={label}
    aria-label={label}
    color={color}
    size="small"
    onClick={() => onClick(rowId)}
  >
    <Icon />
  </IconButton>
);

const renderActions = ({ classes, columnId, rowId, actions }) => (
  <TableCell key={columnId}>
    <div className={classes.actions}>
      {actions.map((action) => renderAction(rowId, action))}
    </div>
  </TableCell>
);

const renderCell = (id, value) => <TableCell key={id}>{value}</TableCell>;

const renderRow = ({ classes, row, columns, actions }) => {
  const { id: rowId } = row;

  return (
    <TableRow hover tabIndex={-1} key={rowId}>
      {columns.map(({ id }) => {
        if (id === 'actions')
          return renderActions({ classes, columnId: id, rowId, actions });

        const value = row[id];
        return renderCell(id, value);
      })}
    </TableRow>
  );
};

const renderRows = ({ classes, rows, columns, actions }) =>
  rows.map((row) => renderRow({ classes, row, columns, actions }));

export const TableBody = memo((props) => {
  const classes = useStyles();

  return <TableBodyMUI>{renderRows({ classes, ...props })}</TableBodyMUI>;
});
