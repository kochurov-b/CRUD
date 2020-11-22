import { useContext } from 'react';

import { ConfirmContext } from './Confirm.context';

export const useConfirm = () => useContext(ConfirmContext);
