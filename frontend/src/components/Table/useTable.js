import { useState, useRef, useCallback } from 'react';

const getEntityData = (entityDataStore) => {
  const {
    current: { onConfirm, ...entityData },
  } = entityDataStore;

  return {
    ...entityData,
    onConfirm,
  };
};

export const useTable = ({
  dialogFetchEntityData,
  getSkipRowsCount,
  getRowsPerPage,
  rowsPerPageInitial,
  onAdd,
}) => {
  const entityDataStore = useRef({});
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

  const handleOpen = (entityData) => {
    entityDataStore.current = entityData;

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = (formValue) => {
    const { onConfirm, ...entityData } = getEntityData(entityDataStore);

    onConfirm({ ...entityData, ...formValue });
    handleClose();
  };

  const handleClickButtonAdd = () => handleOpen({ onConfirm: onAdd });

  const dialogFetchEntityDataWithId = useCallback(() => {
    const { id: entityId } = getEntityData(entityDataStore);

    if (dialogFetchEntityData && entityId) {
      dialogFetchEntityData(entityId);
    }
  }, []);

  return {
    open,
    page,
    rowsPerPage,
    dialogFetchEntityDataWithId,
    onConfirm: handleConfirm,
    onClickButtonAdd: handleClickButtonAdd,
    onChangePage: handleChangePageWithSkip,
    onChangeRowsPerPage: handleChangeRowsPerPageWithPerPage,
    onOpen: handleOpen,
    onClose: handleClose,
  };
};
