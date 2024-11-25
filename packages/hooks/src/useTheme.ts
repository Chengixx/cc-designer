import { onMounted, onUnmounted, ref, watch } from "vue";
import { useObserve } from "./useObserve";

export type ThemeManage = ReturnType<typeof useTheme>;

export const useTheme = () => {
  const htmlElement: HTMLElement = document.documentElement;
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
  const { mutationObserver } = useObserve(observerCallback);

  onMounted(() => {
    //初始化状态
    isDark.value = htmlElement.classList.contains("dark");
    mutationObserver.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });

  onUnmounted(() => {
    mutationObserver.disconnect();
  });

  return {
    isDark,
    toggleThemeMode,
  };
};
