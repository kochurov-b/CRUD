import { useState } from 'react';

export const useTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setRowsPerPage(Number(value));
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  };
};
