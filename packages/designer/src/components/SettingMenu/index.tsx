import { TabPane, Tabs } from "@cgx-designer/extensions";
import { defineComponent, inject, ref } from "vue";
import EditorFormSetting from "./EditorFormSetting";
import ElementAttribute from "./ElementAttribute";
import { CollapseManage, FocusManage } from "@cgx-designer/hooks";
import ElementEvent from "./ElementEvent";
import ElementStyle from "./ElementStyle";
import ElementBread from "./ElementBread";

const SettingMenu = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;
    const focusManage = inject("focusManage") as FocusManage;
    const settingTab = ref<string>("0");
    return () => {
      return (
        <div
          class={[
            "c-h-[calc(100vh-48px)] c-border-l c-bg-white c-border-gray-200 c-overflow-hidden dark:c-bg-darkMode dark:c-border-darkMode c-transition-[width] c-duration-300",
            collapseManage.rightMenuCollapseState.value
              ? "c-w-[300px]"
              : "c-w-0",
          ]}
        >
          <div class="c-h-full c-border-t c-border-gray-200 dark:c-border-darkMode c-min-w-[300px]">
            <ElementBread />
            <Tabs v-model={settingTab.value} class="no-padding-tabs">
              <TabPane label="属性">
                <div class="c-h-[calc(100vh-128px)] c-overflow-y-auto c-px-2 c-pt-2 c-border-t dark:c-border-darkMode">
                  {focusManage.focusedElement.value ? (
                    <ElementAttribute />
                  ) : (
                    <EditorFormSetting />
                  )}
                </div>
              </TabPane>
              <TabPane label="事件">
                <div class="c-h-[calc(100vh-128px)] c-overflow-y-auto c-px-2 c-pt-2 c-border-t dark:c-border-darkMode">
                  <ElementEvent />
                </div>
              </TabPane>
              <TabPane label="样式">
                <div class="c-h-[calc(100vh-128px)] c-overflow-y-auto c-overflow-x-hidden c-px-[14px] c-pt-2 c-border-t dark:c-border-darkMode">
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
