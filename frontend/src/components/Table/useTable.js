import { useState } from 'react';

export const useTable = (rowsPerPageInitial) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageInitial);

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  };
};
