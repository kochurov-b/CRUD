import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { TableHead } from './Head/Head';
import { TableBody } from './Body/Body';
import { useTable } from './useTable';
import { useStyles } from './Table.styles';
import { FormDialog } from './FormDialog/FormDialog';

const renderLoaderContainer = (classes) => (
  <div className={classes.loaderContainer}>
    <CircularProgress />
  </div>
);

const renderPagination = ({
  classes,
  loading,
  totalCount,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  if (loading)
    return (
      <div className={classes.loaderFooter}>
        <CircularProgress size={30} />
      </div>
    );

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
};

const renderFooter = ({
  loading,
  classes,
  totalCount,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onOpen,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <footer className={classes.footer}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onOpen}
    >
      Add
    </Button>
    {renderPagination({
      classes,
      loading,
      totalCount,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      onChangePage,
      onChangeRowsPerPage,
    })}
  </footer>
);

export const Table = memo(
  ({
    columns,
    rows,
    actions,
    loading,
    totalCount,
    formFields,
    dialogTitle,
    dialogContentText,
    rowsPerPageOptions,
    getSkipRowsCount,
    getRowsPerPage,
    onAdd,
  }) => {
    const classes = useStyles();
    const {
      open,
      page,
      rowsPerPage,
      onOpen,
      onClose,
      onConfirm,
      onChangePage,
      onChangeRowsPerPage,
    } = useTable({
      getSkipRowsCount,
      getRowsPerPage,
      rowsPerPageInitial: rowsPerPageOptions[0],
      onAdd,
    });

    return (
      <>
        <Paper className={classes.paper}>
          <TableContainer className={classes.container}>
            {loading && renderLoaderContainer(classes)}
            <TableMUI stickyHeader>
              <TableHead columns={columns} />
              <TableBody columns={columns} rows={rows} actions={actions} />
            </TableMUI>
          </TableContainer>
          {renderFooter({
            loading,
            classes,
            totalCount,
            page,
            rowsPerPage,
            rowsPerPageOptions,
            onOpen,
            onChangePage,
            onChangeRowsPerPage,
          })}
        </Paper>
        <FormDialog
          open={open}
          title={dialogTitle}
          contentText={dialogContentText}
          fields={formFields}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </>
    );
  },
);
