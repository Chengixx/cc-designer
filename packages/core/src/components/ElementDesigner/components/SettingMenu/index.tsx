import { ElTabPane, ElTabs } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import EditorFormSetting from "./EditorFormSetting";
import ElementAttribute from "./ElementAttribute";
import { FocusManage } from "@cgx-designer/hooks";
import ElementEvent from "./ElementEvent";

const SettingMenu = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const settingTab = ref<number>(1);
    return () => {
      return (
        <div class="h-full w-full border-l border-gray-200 overflow-x-hidden dark:bg-darkMode">
          <div class="min-w-[280px] w-full h-10 flex justify-center items-center border border-l-0">
            <span>配置菜单</span>
          </div>
          <div class="h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden w-[280px]">
            <ElTabs v-model={settingTab.value} stretch>
              <ElTabPane label="属性" name={1}>
                <div class="px-2 pt-2">
                  {focusManage.focusedElement.value ? (
                    <ElementAttribute />
                  ) : (
                    <EditorFormSetting />
                  )}
                </div>
              </ElTabPane>
              <ElTabPane label="事件" name={2}>
                <div class="px-2 pt-2">
                  <ElementEvent />
                </div>
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      );
    };
  },
});
export default SettingMenu;
