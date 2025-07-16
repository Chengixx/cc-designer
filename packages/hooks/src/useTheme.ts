import {
  DeepReadonly,
  inject,
  InjectionKey,
  onMounted,
  onUnmounted,
  Ref,
  watch,
} from "vue";
import { useMutationObserver } from "./useMutationObserver";
import { useToggle } from "./useToggle";

export type ThemeManage = ReturnType<typeof useTheme>;

export interface Colors extends BaseColors, OnColors {
  [key: string]: string;
}

interface BaseColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface OnColors {
  "on-background": string;
  "on-surface": string;
  "on-primary": string;
  "on-secondary": string;
  "on-success": string;
  "on-warning": string;
  "on-error": string;
  "on-info": string;
}

interface InternalThemeDefinition {
  dark: boolean;
  colors: Colors;
  variables: Record<string, string | number>;
}

export interface ThemeInstance {
  readonly isDisabled: boolean;
  readonly themes: Ref<Record<string, InternalThemeDefinition>>;

  readonly name: Readonly<Ref<string>>;
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>;
  readonly computedThemes: DeepReadonly<
    Ref<Record<string, InternalThemeDefinition>>
  >;

  readonly themeClasses: Readonly<Ref<string | undefined>>;
  readonly styles: Readonly<Ref<string>>;

  readonly global: {
    readonly name: Ref<string>;
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>;
  };
}

export const ThemeSymbol: InjectionKey<ThemeInstance> =
  Symbol.for("vuetify:theme");

export const useTheme = () => {
  const htmlElement: HTMLElement = document.documentElement;
  const observeConfig = {
    attributes: true,
    attributeFilter: ["class"],
  };
  const [isDark, toggleThemeMode] = useToggle(false);
  const theme = inject(ThemeSymbol, null);

  watch(
    () => isDark.value,
    () => {
      htmlElement.classList[isDark.value ? "add" : "remove"]("dark");
      if (theme) {
        theme.global.name.value = isDark.value ? "dark" : "light";
      }
    },
    { immediate: true }
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
  const { startObserver, stopObserver } = useMutationObserver(
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
