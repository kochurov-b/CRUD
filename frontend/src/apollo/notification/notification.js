import { useSubscription } from '@apollo/react-hooks';

import { NOTIFICATION } from './notification.query';

const DEFAULT_NOTIFICATION = { message: '', type: 'success' };

export const useSubNotification = () => {
  const { data, loading } = useSubscription(NOTIFICATION);
  const notification = data ? data.notification : DEFAULT_NOTIFICATION;

  return { loading, notification };
};
