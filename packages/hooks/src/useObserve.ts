export const useObserve = (callback: (...args: any[]) => void) => {
  const MutationObserver = window.MutationObserver;

  const observerConfig = {
    childList: true,
    attributes: true,
    subtree: true,
  };

  // 初始化观察者实例
  const mutationObserver = new MutationObserver(callback);

  return {
    mutationObserver,
    observerConfig,
  };
};
