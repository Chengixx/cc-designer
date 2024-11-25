import { onMounted, onUnmounted, ref, watch } from "vue";
import { useObserve } from "./useObserve";

export type ThemeManage = ReturnType<typeof useTheme>;

export const useTheme = () => {
  const htmlElement: HTMLElement = document.documentElement;
  const observeConfig = {
    attributes: true,
    attributeFilter: ["class"],
  };
  const isDark = ref<boolean>(false);
  const toggleThemeMode = () => {
    isDark.value = !isDark.value;
  };
  watch(
    () => isDark.value,
    () => {
      htmlElement.classList[isDark.value ? "add" : "remove"]("dark");
    }
  );

  const observerCallback = (mutations: MutationRecord[]) => {
    for (let mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const target = mutation.target as HTMLElement;
        isDark.value = target.classList.contains("dark");
      }
    }
  };
  const { startObserver, stopObserver } = useObserve(
    htmlElement,
    observerCallback,
    observeConfig
  );

  onMounted(() => {
    //初始化状态
    isDark.value = htmlElement.classList.contains("dark");
    startObserver();
  });

  onUnmounted(() => {
    stopObserver();
  });

  return {
    isDark,
    toggleThemeMode,
  };
};
