export const defaultObserverConfig: MutationObserverInit = {
  childList: true,
  attributes: true,
  subtree: true,
};

export type ObserveManage = ReturnType<typeof useObserve>;

export const useObserve = (
  element: HTMLElement,
  callback: (...args: any[]) => void,
  config: MutationObserverInit = defaultObserverConfig
) => {
  const MutationObserver = window.MutationObserver;

  // 初始化观察者实例
  const mutationObserver = new MutationObserver(callback);

  const startObserver = () => {
    mutationObserver.observe(element, config);
  };

  const stopObserver = () => {
    mutationObserver.disconnect();
  };
  return {
    mutationObserver,
    startObserver,
    stopObserver,
  };
};
