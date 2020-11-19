import { useState } from 'react';

export const useTable = ({
  getSkipRowsCount,
  getRowsPerPage,
  rowsPerPageInitial,
  onAdd,
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageInitial);

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleChangePageWithSkip = (event, newPage) => {
    handleChangePage(newPage);
    getSkipRowsCount(newPage * rowsPerPage);
  };

  const handleChangeRowsPerPageWithPerPage = ({ target: { value } }) => {
    const currentValue = Number(value);

    handleChangeRowsPerPage(currentValue);
    getRowsPerPage(currentValue);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onConfirm = (formValue) => {
    onAdd(formValue);
    handleClose();
  };

  return {
    open,
    page,
    rowsPerPage,
    onConfirm,
    onChangePage: handleChangePageWithSkip,
    onChangeRowsPerPage: handleChangeRowsPerPageWithPerPage,
    onOpen: handleOpen,
    onClose: handleClose,
  };
};
