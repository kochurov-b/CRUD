export const getPromiseCallbacks = (promiseCallbacks) => {
  const { current: callbacks } = promiseCallbacks;

  return {
    ...callbacks,
  };
};
