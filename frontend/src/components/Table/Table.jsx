import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TableHead } from './Head/Head';
import { TableBody } from './Body/Body';
import { useTable } from './useTable';
import { useStyles } from './Table.styles';

const renderLoaderContainer = (classes) => (
  <div className={classes.loaderContainer}>
    <CircularProgress />
  </div>
);

const renderFooter = ({
  loading,
  classes,
  totalCount,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onChangePageCustom,
  onChangeRowsPerPageCustom,
}) => (
  <footer className={classes.footer}>
    {loading ? (
      <div className={classes.loaderFooter}>
        <CircularProgress size={30} />
      </div>
    ) : (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePageCustom}
        onChangeRowsPerPage={onChangeRowsPerPageCustom}
      />
    )}
  </footer>
);

export const Table = memo(
  ({
    columns,
    rows,
    actions,
    loading,
    totalCount,
    rowsPerPageOptions,
    getSkipRowsCount,
    getRowsPerPage,
  }) => {
    const classes = useStyles();
    const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable(
      rowsPerPageOptions[0],
    );

    const onChangePageCustom = (event, newPage) => {
      onChangePage(newPage);
      getSkipRowsCount(newPage * rowsPerPage);
    };

    const onChangeRowsPerPageCustom = ({ target: { value } }) => {
      const currentValue = Number(value);

      onChangeRowsPerPage(currentValue);
      getRowsPerPage(currentValue);
    };

    return (
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
          onChangePageCustom,
          onChangeRowsPerPageCustom,
        })}
      </Paper>
    );
  },
);
