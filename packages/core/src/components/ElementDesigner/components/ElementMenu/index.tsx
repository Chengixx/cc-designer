import { defineComponent, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";
import { TabPane, Tabs } from "@cgx-designer/extensions";
import ElementSource from "./components/ElementSource";

const ElementMenu = defineComponent({
  setup() {
    const searchValue = ref<string>("");
    const settingTab = ref<string>("0");

    return () => {
      return (
        <div class="c-overflow-x-hidden c-border-r c-border-gray-200 dark:c-border-darkMode dark:c-bg-darkMode">
          <div class="c-w-full c-h-10 c-flex c-justify-center c-items-center c-border-y c-min-w-[280px] dark:c-border-darkMode">
            <span>组件菜单</span>
          </div>
          <div class="c-w-full c-h-[calc(100vh-80px)] c-overflow-y-auto c-overflow-x-hidden c-min-w-[280px]">
            <Tabs v-model={settingTab.value}>
              <TabPane label="组件">
                <div>
                  <SearchBox v-model:widgetName={searchValue.value} />
                  <ElementList searchValue={searchValue.value} />
                </div>
              </TabPane>
              <TabPane label="源码">
                <div class="c-h-[calc(100vh-120px)] c-w-full">
                  <ElementSource />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      );
    };
  },
});
export default ElementMenu;
