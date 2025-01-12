import { defineComponent, onUpdated, PropType, ref } from "vue";
import { TabPaneContext } from "./TabPane";
import TabBar from "./TabBar";
import { useResizeObserver } from "@vueuse/core";
import { Ripple } from "./../../directives/ripple/index";

const TabNav = defineComponent({
  directives: {
    ripple: Ripple,
  },
  props: {
    currentName: {
      //string或者number都可以
      type: [String, Number],
      required: true,
    },
    panes: {
      type: Array as PropType<TabPaneContext[]>,
      required: true,
    },
  },
  emits: ["tabClick"],
  setup(props, { emit }) {
    const el$ = ref<HTMLDivElement>();
    const tabBarRef = ref<InstanceType<typeof TabBar>>();
    const update = () => {
      //@ts-ignore
      tabBarRef.value?.update();
    };
    useResizeObserver(el$.value, update);
    onUpdated(() => update());

    return () => {
      //循环出来
      const tabs = props.panes?.map((pane, index) => {
        const uid = pane.uid;
        //顺序 是 有name 没有index 还没有直接注册一下这里的index
        const tabName = pane.props.name ?? pane.index ?? `${index}`;
        pane.index = `${index}`;

        return (
          <div
            // 此处给ref是给子tabbar用的
            ref={`tab-${uid}`}
            key={`tab-${uid}`}
            class={[
              "c-flex-1 c-cursor-pointer hover:c-text-blue-400 hover:c-bg-gray-50 dark:hover:c-bg-gray-800",
              props.currentName === tabName && "c-text-blue-400",
            ]}
            onClick={(e: MouseEvent) => emit("tabClick", pane, tabName, e)}
          >
            <div
              class="c-w-full c-h-full c-flex c-justify-center c-items-center c-text-sm c-font-medium"
              v-ripple={{ class: "c-text-gray-400" }}
            >
              <span class="c-select-none">{pane.props.label}</span>
            </div>
          </div>
        );
      });

      return (
        <div class="c-w-full c-h-full c-flex c-relative" ref={el$}>
          {tabs}
          <TabBar ref={tabBarRef} tabs={[...props.panes!]} />
        </div>
      );
    };
  },
});

export default TabNav;
