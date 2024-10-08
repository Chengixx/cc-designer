import { ElTabPane, ElTabs } from "element-plus";
import { defineComponent, ref } from "vue";
import EditorElementSetting from "./EditorElementSetting";
import EditorFormSetting from "./EditorFormSetting";

const SettingMenu = defineComponent({
  setup() {
    const settingTab = ref<number>(1);
    return () => {
      return (
        <div class="h-full w-full">
          <div class="w-full h-10 flex justify-center items-center border">
            <span>配置菜单</span>
          </div>
          <div class="h-95% overflow-y-auto overflow-x-hidden w-[280px]">
            <ElTabs v-model={settingTab.value} stretch>
              <ElTabPane label="组件属性" name={1}>
                <div class="px-2 pt-2">
                  <EditorElementSetting />
                </div>
              </ElTabPane>
              <ElTabPane label="表单属性" name={2}>
                <div class="px-2 pt-2">
                  <EditorFormSetting />
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
