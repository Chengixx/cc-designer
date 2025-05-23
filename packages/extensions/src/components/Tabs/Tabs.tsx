import { useOrderedChildren } from "@cgx-designer/hooks";
import {
  defineComponent,
  getCurrentInstance,
  provide,
  Ref,
  ref,
  renderSlot,
  watch,
} from "vue";
import TabNav from "./TabNav";
import { TabPaneContext } from "./TabPane";
import { isUndefined } from "lodash-es";

export interface TabsRootContext {
  props: any;
  currentName: Ref<string>;
  registerPane: Function;
  unregisterPane: Function;
}

export type TabPaneName = string | number;

const Tabs = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "0",
    },
  },
  emits: ["tabClick", "tabChange", "update:modelValue"],
  setup(props, { slots, emit }) {
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
    } = useOrderedChildren<TabPaneContext>(getCurrentInstance()!, "CTabPane");

    watch(
      () => props.modelValue,
      (modelValue) => setCurrentName(modelValue)
    );

    const setCurrentName = async (value?: TabPaneName, isHandle = false) => {
      if (currentName.value === value || isUndefined(value)) return;
      currentName.value = value;
      if (isHandle) {
        emit("update:modelValue", value);
        emit("tabChange", value);
      }
    };

    const handleTabClick = (
      tab: TabPaneContext,
      tabName: TabPaneName,
      event: MouseEvent
    ) => {
      if (tab.props.disabled) return;
      setCurrentName(tabName, true);
      emit("tabClick", tab, event);
    };

    const currentName = ref<TabPaneName>(props.modelValue ?? "0");

    provide("tabsRootContext", {
      props,
      currentName,
      registerPane,
      unregisterPane,
    });
    return () => {
      const header = (
        <div class="c-w-full c-h-10">
          <TabNav
            currentName={currentName.value}
            panes={panes.value}
            onTabClick={handleTabClick}
          />
        </div>
      );

      const panels = <div>{renderSlot(slots, "default")}</div>;
      return <div class="c-w-full">{[header, panels]}</div>;
    };
  },
});

export default Tabs;
