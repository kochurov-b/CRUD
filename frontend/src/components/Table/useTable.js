import { useState, useRef, useCallback } from 'react';

const getEntityData = (entityDataStore) => {
  const { current: entityData } = entityDataStore;

  return {
    ...entityData,
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

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = (formValue) => {
    const { onConfirm, entityId, ...entityData } = getEntityData(
      entityDataStore,
    );

    onConfirm({
      ...entityData,
      ...formValue,
      id: entityId,
    });
    handleClose();
  };

  const handleClickButtonAdd = () => {
    entityDataStore.current = {
      onConfirm: onAdd,
    };

    handleOpen();
  };

  const handleClickButtonAction = (args) => {
    const { withDialog, entityId, entityInfo, onClick, ...otherArgs } = args;

    if (withDialog) {
      entityDataStore.current = {
        ...otherArgs,
        entityId,
        onConfirm: onClick,
      };

      return handleOpen();
    }

    return onClick({
      ...otherArgs,
      ...entityInfo,
      id: entityId,
    });
  };

  const dialogFetchEntityDataWithId = useCallback(() => {
    const { entityId, name: actionName } = getEntityData(entityDataStore);

    if (dialogFetchEntityData && actionName === 'update') {
      dialogFetchEntityData(entityId);
    }
  }, [dialogFetchEntityData]);

  return {
    open,
    page,
    actionName: getEntityData(entityDataStore).name,
    rowsPerPage,
    dialogFetchEntityDataWithId,
    onConfirm: handleConfirm,
    onClickButtonAdd: handleClickButtonAdd,
    onChangePage: handleChangePageWithSkip,
    onChangeRowsPerPage: handleChangeRowsPerPageWithPerPage,
    onClose: handleClose,
    onClickButtonAction: handleClickButtonAction,
  };
};
