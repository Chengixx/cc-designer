import { defineComponent, inject, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";
import ElementSource from "./components/ElementSource";
import ElementTree from "./components/ElementTree";
import { ElementIcon, SourceCodeIcon, TreeIcon } from "@cgx-designer/icons";
import { CTooltip } from "@cgx-designer/extensions";
import { CollapseManage } from "@cgx-designer/hooks";

const ElementMenu = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;

    const menuList = [
      {
        icon: ElementIcon,
        tip: "组件库",
        key: "0",
        render: () => {
          return (
            <>
              <SearchBox v-model:widgetName={searchValue.value} />
              <ElementList searchValue={searchValue.value} />
            </>
          );
        },
      },
      {
        icon: TreeIcon,
        tip: "大纲树",
        key: "1",
        render: () => {
          return (
            <>
              <div class="c-h-[calc(100vh-88px)] c-w-full c-border-t dark:c-border-darkMode">
                <ElementTree />
              </div>
            </>
          );
        },
      },
      {
        icon: SourceCodeIcon,
        tip: "源码",
        key: "2",
        render: () => {
          return (
            <>
              <div class="c-h-[calc(100vh-88px)] c-w-full dark:c-border-darkMode">
                <ElementSource />
              </div>
            </>
          );
        },
      },
    ];
    const searchValue = ref<string>("");
    const settingTab = ref<string>("0");

    return () => {
      return (
        <div class="c-border-r c-border-gray-200 c-flex dark:c-border-darkMode dark:c-bg-darkMode">
          <div class="c-min-w-[48px] c-w-[48px] c-h-[calc(100vh-48px)] c-border-t c-border-r c-border-gray-200 dark:c-border-darkMode">
            <div class="c-w-full c-pt-3">
              {menuList.map((Icon) => (
                <div
                  onClick={() => {
                    if (collapseManage.leftMenuCollapseState.value === false) {
                      collapseManage.toggleLeftMenu();
                    }
                    settingTab.value = Icon.key;
                  }}
                  class="c-w-full c-h-[48px] c-flex c-justify-center c-items-center"
                >
                  <CTooltip tooltip={Icon.tip} placement="right">
                    <Icon.icon
                      class={[
                        "c-w-5 c-h-5 c-cursor-pointer",
                        settingTab.value === Icon.key
                          ? "c-fill-blue-500 dark:c-fill-blue-300"
                          : "c-fill-gray-600 dark:c-fill-gray-400",
                      ]}
                    />
                  </CTooltip>
                </div>
              ))}
            </div>
          </div>
          <div class="c-h-[calc(100vh-48px)] c-overflow-y-auto c-overflow-x-hidden c-w-[300px] c-border-gray-200 dark:c-border-darkMode">
            {menuList.find((item) => item.key === settingTab.value)?.render()}
          </div>
        </div>
      );
    };
  },
});
export default ElementMenu;
