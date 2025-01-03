import { ElTabPane, ElTabs } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import EditorFormSetting from "./EditorFormSetting";
import ElementAttribute from "./ElementAttribute";
import { FocusManage } from "@cgx-designer/hooks";
import ElementEvent from "./ElementEvent";
import ElementStyle from "./ElementStyle";
import "../../../../style/index.css"

const SettingMenu = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const settingTab = ref<number>(1);
    return () => {
      return (
        <div class="c-h-full c-w-full c-border-l c-border-gray-200 c-overflow-x-hidden dark:c-bg-darkMode dark:c-border-darkMode">
          <div class="c-min-w-[280px] c-w-full c-h-10 c-flex c-justify-center c-items-center c-border c-border-l-0 dark:c-border-darkMode">
            <span>配置菜单</span>
          </div>
          <div class="c-h-[calc(100vh-80px)] c-overflow-y-auto c-overflow-x-hidden c-w-[280px]">
            <ElTabs v-model={settingTab.value} stretch class="no-padding-tabs">
              <ElTabPane label="属性" name={1}>
                <div class="c-px-2 c-pt-2">
                  {focusManage.focusedElement.value ? (
                    <ElementAttribute />
                  ) : (
                    <EditorFormSetting />
                  )}
                </div>
              </ElTabPane>
              <ElTabPane label="事件" name={2}>
                <div class="c-px-2 c-pt-2">
                  <ElementEvent />
                </div>
              </ElTabPane>
              <ElTabPane label="样式" name={3}>
                <div class="c-px-2 c-pt-2">
                  <ElementStyle />
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
