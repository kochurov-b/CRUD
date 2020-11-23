export const setNotification = (message, type = 'success') => ({
  notification: {
    message,
    type,
  },
});
