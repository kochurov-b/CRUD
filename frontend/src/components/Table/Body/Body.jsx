import React, { memo } from 'react';
import TableBodyMUI from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './Body.styles';

const renderAction = ({
  entityId,
  entityInfo,
  action: { label, color, icon: Icon, ...actionProps },
  onClickButtonAction,
}) => (
  <Tooltip key={label} title={label}>
    <IconButton
      aria-label={label}
      color={color}
      size="small"
      onClick={() =>
        onClickButtonAction({
          ...actionProps,
          entityId,
          entityInfo,
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
  entityId,
  entityInfo,
  actions,
  onClickButtonAction,
}) => (
  <TableCell key={columnId}>
    <div className={classes.actions}>
      {actions.map((action) =>
        renderAction({ entityId, entityInfo, action, onClickButtonAction }),
      )}
    </div>
  </TableCell>
);

const renderCell = (id, value) => <TableCell key={id}>{value}</TableCell>;

const renderRow = ({ classes, row, columns, actions, onClickButtonAction }) => {
  const { id: entityId } = row;

  return (
    <TableRow hover tabIndex={-1} key={entityId}>
      {columns.map(({ id }) => {
        if (id === 'actions') {
          return renderActions({
            classes,
            columnId: id,
            entityId,
            entityInfo: row,
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
  const classes = useStyles();

  return (
    <TableBodyMUI>
      {renderRows({
        ...props,
        classes,
      })}
    </TableBodyMUI>
  );
});
