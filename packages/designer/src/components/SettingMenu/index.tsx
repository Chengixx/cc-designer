import { TabPane, Tabs } from "@cgx-designer/extensions";
import { defineComponent, inject, ref } from "vue";
import EditorFormSetting from "./EditorFormSetting";
import ElementAttribute from "./ElementAttribute";
import { FocusManage } from "@cgx-designer/hooks";
import ElementEvent from "./ElementEvent";
import ElementStyle from "./ElementStyle";
import ElementBread from "./ElementBread";

const SettingMenu = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const settingTab = ref<string>("0");
    return () => {
      return (
        <div class="c-h-full c-w-full c-border-l c-border-gray-200 c-overflow-x-hidden dark:c-bg-darkMode dark:c-border-darkMode">
          <ElementBread />
          <div class="c-h-[calc(100vh-88px)] c-border-t c-overflow-y-auto c-overflow-x-hidden c-w-[300px] c-border-gray-200 dark:c-border-darkMode">
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
                <div class="c-px-[13px] c-pt-2 c-border-t dark:c-border-darkMode">
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
