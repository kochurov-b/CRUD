import React, { useRef, useState, createContext } from 'react';

import { Confirm } from './Confirm';
import { getPromiseCallbacks } from './Confirm.helper';

export const ConfirmContext = createContext(Promise.reject);

export const ConfirmProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState(null);
  const promiseCallbacks = useRef();

  const openConfirm = (options) => {
    setConfirmOptions(options);
    setOpen(true);

    return new Promise((resolve, reject) => {
      promiseCallbacks.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    const { reject } = getPromiseCallbacks(promiseCallbacks);

    reject();
    setOpen(false);
  };

  const handleConfirm = () => {
    const { resolve } = getPromiseCallbacks(promiseCallbacks);

    resolve();
    setOpen(false);
  };

  return (
    <>
      <ConfirmContext.Provider value={openConfirm} children={children} />

      <Confirm
        {...confirmOptions}
        open={open}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};
