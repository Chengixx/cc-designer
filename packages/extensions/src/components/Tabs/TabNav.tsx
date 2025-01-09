import { defineComponent, PropType } from "vue";
import { TabPaneContext } from "./TabPane";
import { vWaves } from "../../directives/waves/index";

const TabNav = defineComponent({
  directives: {
    wave: vWaves,
  },
  props: {
    currentName: {
      //string或者number都可以
      type: [String, Number],
      required: true,
    },
    panes: {
      type: Array as PropType<TabPaneContext[]>,
    },
  },
  emits: ["tabClick"],
  setup(props, { emit }) {
    return () => {
      //循环出来
      const tabs = props.panes?.map((pane, index) => {
        //顺序 是 有name 没有index 还没有直接注册一下这里的index
        const tabName = pane.props.name ?? pane.index ?? `${index}`;
        pane.index = `${index}`;

        return (
          <div
            class={[
              "c-flex-1 c-cursor-pointer",
              props.currentName === tabName
                ? "c-border-b-2 c-border-b-blue-400 c-box-border"
                : "",
            ]}
            onClick={(e: MouseEvent) => emit("tabClick", pane, tabName, e)}
          >
            <div
              class="c-w-full c-h-full c-flex c-justify-center c-items-center"
              v-wave
            >
              <span class="c-select-none">{pane.props.label}</span>
            </div>
          </div>
        );
      });

      return <div class="c-w-full c-h-full c-flex">{tabs}</div>;
    };
  },
});

export default TabNav;
