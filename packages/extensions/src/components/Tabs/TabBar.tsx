import {
  capitalize,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  PropType,
  ref,
  watch,
} from "vue";
import { TabPaneContext } from "./TabPane";
import { useResizeObserver } from "@vueuse/core";

const TabBar = defineComponent({
  props: {
    tabs: {
      type: Array as PropType<TabPaneContext[]>,
      required: true,
    },
  },
  setup(props, { expose }) {
    const barRef = ref<HTMLDivElement>();
    const instance = getCurrentInstance()!;

    const barStyle = ref<CSSProperties>();
    const update = () => (barStyle.value = getBarStyle());
    const getBarStyle = (): CSSProperties => {
      let offset = 0;
      let tabSize = 0;

      const sizeName = "width";
      const sizeDir = "x";
      const position = "left";

      props.tabs.every((tab) => {
        const $el = instance.parent?.refs?.[`tab-${tab.uid}`] as HTMLElement;
        if (!$el) return false;

        if (!tab.active) {
          return true;
        }

        offset = $el[`offset${capitalize(position)}`];
        tabSize = $el[`client${capitalize(sizeName)}`];

        const tabStyles = window.getComputedStyle($el);

        if (sizeName === "width") {
          tabSize -=
            Number.parseFloat(tabStyles.paddingLeft) +
            Number.parseFloat(tabStyles.paddingRight);
          offset += Number.parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });

      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${capitalize(sizeDir)}(${offset}px)`,
      };
    };

    const saveObserver = [] as ReturnType<typeof useResizeObserver>[];
    const observerTabs = () => {
      saveObserver.forEach((observer) => observer.stop());
      saveObserver.length = 0;
      const list = instance.parent?.refs as Record<string, HTMLElement>;
      if (!list) return;
      for (const key in list) {
        if (key.startsWith("tab-")) {
          const _el = list[key];
          if (_el) {
            saveObserver.push(useResizeObserver(_el, update));
          }
        }
      }
    };

    watch(
      () => props.tabs,
      async () => {
        await nextTick();
        update();

        observerTabs();
      },
      { immediate: true }
    );

    const barObserver = useResizeObserver(barRef.value, () => update());

    onBeforeUnmount(() => {
      saveObserver.forEach((observer) => observer.stop());
      saveObserver.length = 0;
      barObserver.stop();
    });

    expose({
      update,
      ref: barRef,
    });

    return () => (
      <div
        class="c-h-[2px] c-bg-blue-400 c-absolute c-bottom-0 c-transition-all c-duration-300"
        ref={barRef}
        style={barStyle.value}
      />
    );
  },
});

export default TabBar;
