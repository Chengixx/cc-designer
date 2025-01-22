import { TabPane, Tabs } from "@cgx-designer/extensions";
import { defineComponent, inject, ref } from "vue";
import EditorFormSetting from "./EditorFormSetting";
import ElementAttribute from "./ElementAttribute";
import { FocusManage } from "@cgx-designer/hooks";
import ElementEvent from "./ElementEvent";
import ElementStyle from "./ElementStyle";

const SettingMenu = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const settingTab = ref<string>("0");
    return () => {
      return (
        <div class="c-h-full c-w-full c-border-l c-border-gray-200 c-overflow-x-hidden dark:c-bg-darkMode dark:c-border-darkMode">
          <div class="c-min-w-[280px] c-select-none c-w-full c-h-10 c-flex c-justify-center c-items-center c-border c-border-l-0 dark:c-border-darkMode">
            <span>配置菜单</span>
          </div>
          <div class="c-h-[calc(100vh-80px)] c-overflow-y-auto c-overflow-x-hidden c-w-[280px]">
            <Tabs v-model={settingTab.value} class="no-padding-tabs">
              <TabPane label="属性">
                <div class="c-px-2 c-pt-2 c-border-t dark:c-border-darkMode">
                  {focusManage.focusedElement.value ? (
                    <ElementAttribute />
                  ) : (
                    <EditorFormSetting />
                  )}
                </div>
              </TabPane>
              <TabPane label="事件">
                <div class="c-px-2 c-pt-2 c-border-t dark:c-border-darkMode">
                  <ElementEvent />
                </div>
              </TabPane>
              <TabPane label="样式">
                <div class="c-px-2 c-pt-2 c-border-t dark:c-border-darkMode">
                  <ElementStyle />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      );
    };
  },
});
export default SettingMenu;
