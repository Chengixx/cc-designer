import { useSupported } from "@vueuse/core";
import { computed, onBeforeUnmount, Ref, ref, toValue, watch } from "vue";
export const defaultObserverConfig: MutationObserverInit = {
  childList: true,
  attributes: true,
  subtree: true,
};

export type ObserveManage = ReturnType<typeof useMutationObserver>;

export function useMutationObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultObserverConfig
) {
  const isSupported = useSupported(
    () => window && "MutationObserver" in window
  );
  const stopObservation = ref(false);
  let observer: MutationObserver | undefined;
  const targets = computed(() => {
    const targetsValue = toValue(target);
    if (targetsValue) {
      if (Array.isArray(targetsValue)) {
        return targetsValue
          .map((el: any) => toValue(el))
          .filter((el: any) => el);
      } else {
        return [targetsValue];
      }
    }
    return [];
  });
  // 定义清理函数，用于断开 MutationObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
  // 初始化 MutationObserver，开始观察目标元素
  const observeElements = () => {
    if (isSupported.value && targets.value.length && !stopObservation.value) {
      observer = new MutationObserver(callback);
      targets.value.forEach((element: HTMLElement) =>
        observer!.observe(element, options)
      );
    }
  };
  // 监听 targets 的变化，当 targets 变化时，重新建立 MutationObserver 观察
  watch(
    () => targets.value,
    () => {
      cleanup();
      observeElements();
    },
    {
      immediate: true, // 立即触发回调，以便初始状态也被观察
      flush: "post",
    }
  );
  const stopObserver = () => {
    stopObservation.value = true;
    cleanup();
  };
  const startObserver = () => {
    stopObservation.value = false;
    observeElements();
  };
  // 在组件卸载前清理 MutationObserver
  onBeforeUnmount(() => cleanup());
  return {
    startObserver,
    stopObserver,
  };
}
