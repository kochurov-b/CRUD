import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { TableHead } from './Head/Head';
import { TableBody } from './Body/Body';
import { useTable } from './useTable';
import { useStyles } from './Table.styles';
import { FormDialog } from './FormDialog/FormDialog';
import { Loader } from '../Loader/Loader';

const renderPagination = ({
  loading,
  totalCount,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  if (loading) return <Loader open={loading} size={30} />;

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
  onClickButtonAdd,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <footer className={classes.footer}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onClickButtonAdd}
    >
      Add
    </Button>
    {renderPagination({
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
    dialogFetchEntityData,
    dialogLoading,
    dialogData,
    rowsPerPageOptions,
    getSkipRowsCount,
    getRowsPerPage,
    onAdd,
  }) => {
    const classes = useStyles();
    const {
      open,
      page,
      actionName,
      rowsPerPage,
      dialogFetchEntityDataWithId,
      onClose,
      onConfirm,
      onClickButtonAdd,
      onChangePage,
      onChangeRowsPerPage,
      onClickButtonAction,
    } = useTable({
      dialogFetchEntityData,
      getSkipRowsCount,
      getRowsPerPage,
      rowsPerPageInitial: rowsPerPageOptions[0],
      onAdd,
    });

    return (
      <>
        <Paper className={classes.paper}>
          <TableContainer className={classes.container}>
            <Loader open={loading} />
            <TableMUI stickyHeader>
              <TableHead columns={columns} />
              <TableBody
                columns={columns}
                rows={rows}
                actions={actions}
                onClickButtonAction={onClickButtonAction}
              />
            </TableMUI>
          </TableContainer>
          {renderFooter({
            loading,
            classes,
            totalCount,
            page,
            rowsPerPage,
            rowsPerPageOptions,
            onClickButtonAdd,
            onChangePage,
            onChangeRowsPerPage,
          })}
        </Paper>
        <FormDialog
          open={open}
          title={dialogTitle}
          contentText={dialogContentText}
          actionName={actionName}
          fetchData={dialogFetchEntityDataWithId}
          loading={dialogLoading}
          data={dialogData}
          fields={formFields}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </>
    );
  },
);
