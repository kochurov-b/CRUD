import { useMemo, useState, useEffect, useCallback } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useQueryUsers } from '../../apollo/users/query/getUsers/getUsers';
import { useQueryGetUserById } from '../../apollo/users/query/getUser/getUser';
import { useMutationCreateUser } from '../../apollo/users/mutation/createUser/createUser';
import { useMutationDeleteUser } from '../../apollo/users/mutation/deleteUser/deleteUser';
import { useMutationUpdateUser } from '../../apollo/users/mutation/updateUser/updateUser';
import { useSubNotification } from '../../apollo/notification/notification';
import { useConfirm } from '../Confirm/Confirm.hook';

import { useStyles } from './App.styles';

export const useApp = () => {
  const rowsPerPageOptions = useMemo(() => [10, 20, 30], []);
  const formFields = useMemo(
    () => [
      {
        label: 'Name',
        name: 'name',
        required: true,
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
      },
    ],
    [],
  );
  const columns = useMemo(
    () => [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'actions', label: 'Actions', width: 100 },
    ],
    [],
  );

  const [skipRowsCount, setSkipRowsCount] = useState(0);
  const [rowsPerPageCount, setRowsPerPageCount] = useState(
    rowsPerPageOptions[0],
  );
  const [openNotification, setOpenNotification] = useState(false);

  const confirm = useConfirm();
  const classes = useStyles();
  const {
    loading,
    users: { users: usersData, totalCount },
    getUsers,
  } = useQueryUsers();
  const { getUserById, userData, loading: userLoading } = useQueryGetUserById();
  const { createUser } = useMutationCreateUser(rowsPerPageCount);
  const { deleteUser } = useMutationDeleteUser();
  const { updateUser } = useMutationUpdateUser();
  const { notification } = useSubNotification();
  const { message } = notification;

  useEffect(() => {
    if (message !== '') {
      setOpenNotification(true);
    }
  }, [message]);

  useEffect(() => {
    getUsers({
      variables: {
        skip: skipRowsCount,
        limit: rowsPerPageCount,
      },
    });
  }, [getUsers, skipRowsCount, rowsPerPageCount]);

  useEffect(() => {
    getUsers({
      variables: {
        skip: 0,
        limit: rowsPerPageCount,
      },
    });
  }, [getUsers, rowsPerPageCount]);

  const handleCloseNotification = () => setOpenNotification(false);

  const generateConfirmOptions = useCallback(
    (name) => ({
      title: `Are you sure you want to delete user "${name}"?`,
      description:
        'When you confirm the action, you will permanently delete the user!',
    }),
    [],
  );

  const deleteUserWithConfirm = useCallback(
    async ({ id, name }) => {
      try {
        await confirm(generateConfirmOptions(name));

        deleteUser(id);
      } catch {}
    },
    [confirm, deleteUser, generateConfirmOptions],
  );

  const actions = useMemo(
    () => [
      {
        label: 'Edit',
        name: 'update',
        icon: EditIcon,
        color: 'primary',
        withDialog: true,
        onClick: ({ id, name, email }) => updateUser({ id, name, email }),
      },
      {
        label: 'Delete',
        name: 'delete',
        icon: DeleteIcon,
        color: 'secondary',
        onClick: deleteUserWithConfirm,
      },
    ],
    [updateUser, deleteUserWithConfirm],
  );

  const dialogFetchEntityData = useCallback((id) => getUserById(id), [
    getUserById,
  ]);

  const onAdd = ({ name, email }) => createUser(name, email);

  return {
    classes,
    actions,
    columns,
    usersData,
    usersLoading: loading,
    usersTotalCount: totalCount,
    userData,
    userLoading,
    formFields,
    setSkipRowsCount,
    setRowsPerPageCount,
    rowsPerPageOptions,
    dialogFetchEntityData,
    notification,
    openNotification,
    onCloseNotification: handleCloseNotification,
    onAdd,
  };
};
