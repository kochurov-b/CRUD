import React, { memo } from 'react';
import TableBodyMUI from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './Body.styles';

const renderAction = ({
  rowId,
  action: { label, color, icon: Icon, withDialog, onClick },
  onClickButtonAction,
}) => (
  <Tooltip key={label} title={label}>
    <IconButton
      aria-label={label}
      color={color}
      size="small"
      onClick={() =>
        onClickButtonAction({
          withDialog,
          rowId,
          onClick,
        })
      }
    >
      <Icon />
    </IconButton>
  </Tooltip>
);

const renderActions = ({
  classes,
  columnId,
  rowId,
  actions,
  onClickButtonAction,
}) => (
  <TableCell key={columnId}>
    <div className={classes.actions}>
      {actions.map((action) =>
        renderAction({ rowId, action, onClickButtonAction }),
      )}
    </div>
  </TableCell>
);

const renderCell = (id, value) => <TableCell key={id}>{value}</TableCell>;

const renderRow = ({ classes, row, columns, actions, onClickButtonAction }) => {
  const { id: rowId } = row;

  return (
    <TableRow hover tabIndex={-1} key={rowId}>
      {columns.map(({ id }) => {
        if (id === 'actions') {
          return renderActions({
            classes,
            columnId: id,
            rowId,
            actions,
            onClickButtonAction,
          });
        }

        const value = row[id];
        return renderCell(id, value);
      })}
    </TableRow>
  );
};

const renderRows = ({ classes, rows, columns, actions, onClickButtonAction }) =>
  rows.map((row) =>
    renderRow({ classes, row, columns, actions, onClickButtonAction }),
  );

export const TableBody = memo((props) => {
  const { onOpenDialog } = props;
  const classes = useStyles();

  const handleClickButtonAction = ({ withDialog, rowId, onClick }) => {
    if (withDialog) {
      return onOpenDialog({
        id: rowId,
        onConfirm: onClick,
      });
    }

    return onClick(rowId);
  };

  return (
    <TableBodyMUI>
      {renderRows({
        ...props,
        classes,
        onClickButtonAction: handleClickButtonAction,
      })}
    </TableBodyMUI>
  );
});
