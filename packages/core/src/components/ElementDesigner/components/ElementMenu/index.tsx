import { defineComponent, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";
import { ElTabPane, ElTabs } from "element-plus";
import ElementSource from "./components/ElementSource";

const ElementMenu = defineComponent({
  setup() {
    const searchValue = ref<string>("");
    const settingTab = ref<number>(1);

    return () => {
      return (
        <div class="overflow-x-hidden border-r border-gray-200 dark:border-darkMode dark:bg-darkMode">
          <div class="w-full h-10 flex justify-center items-center border-y min-w-[260px] dark:border-darkMode">
            <span>组件菜单</span>
          </div>
          <div class="w-full h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden min-w-[260px]">
            <ElTabs v-model={settingTab.value} stretch>
              <ElTabPane label="组件" name={1}>
                <div>
                  <SearchBox v-model:widgetName={searchValue.value} />
                  <ElementList searchValue={searchValue.value} />
                </div>
              </ElTabPane>
              <ElTabPane label="源码" name={2}>
                <div class="h-[calc(100vh-120px)] w-full">
                  <ElementSource />
                </div>
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      );
    };
  },
});
export default ElementMenu;
