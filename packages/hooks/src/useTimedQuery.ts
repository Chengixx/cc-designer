export const useTimedQuery = (handler: () => void, timeout = 16.66) => {
  let timer: number;

  const startTimedQuery = () => {
    stopTimedQuery();
    timer = window.setInterval(handler, timeout);
  };
  const stopTimedQuery = () => {
    window.clearInterval(timer);
  };
  return {
    startTimedQuery,
    stopTimedQuery,
  };
};
