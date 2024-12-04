import { defineComponent, onMounted, provide, ref } from "vue";
import { createOperationButtonSetting } from "./components/OperationMenu/operationButtonSetting";
import CGXLogo from "./components/CGXLogo";
import ElementMenu from "./components/ElementMenu";
import OperationMenu from "./components/OperationMenu";
import EditorCanvas from "./components/EditorCanvas";
import SettingMenu from "./components/SettingMenu";
import PreviewDialog from "./components/PreviewDialog";
import {
  ExportSourceCodeDialog,
  ImportSourceCodeDialog,
} from "./components/SourceCodeDialog";
import {
  useCollapse,
  useCommand,
  useFunction,
  useForm,
  useHover,
  useElement,
  useFocus,
  useTheme,
  useMode,
} from "@cgx-designer/hooks";
//设计器
const ElementDesigner = defineComponent({
  setup() {
    //dialog实例
    const previewDialogRef = ref<any>(null);
    const exportSourceCodeDialogRef = ref<any>(null);
    const importSourceCodeDialogRef = ref<any>(null);
    //左右菜单实例
    const leftMenuRef = ref<HTMLDivElement | null>(null);
    const rightMenuRef = ref<HTMLDivElement | null>(null);
    //所有的hook实例
    const formManage = useForm();
    const elementManage = useElement();
    const collapseManage = useCollapse();
    const themeManage = useTheme();
    const modeManage = useMode();
    const hoverManage = useHover(elementManage, modeManage);
    const focusManage = useFocus(elementManage, modeManage);
    const commandManage = useCommand(elementManage, focusManage);
    const { commands } = commandManage;
    const functionManage = useFunction(elementManage);
    //因为只能有一个实例 所以用provide注入进去
    provide("focusManage", focusManage);
    provide("elementManage", elementManage);
    provide("themeManage", themeManage);
    provide("collapseManage", collapseManage);
    provide("hoverManage", hoverManage);
    provide("formManage", formManage);
    provide("modeManage", modeManage);
    provide("commandManage", commandManage);
    provide("commands", commands);
    provide("functionManage", functionManage);

    const buttonMap = createOperationButtonSetting(
      formManage,
      elementManage,
      functionManage,
      focusManage,
      commandManage,
      commands!,
      previewDialogRef,
      exportSourceCodeDialogRef,
      importSourceCodeDialogRef
    );

    onMounted(() => {
      collapseManage.initMenuInstance(leftMenuRef.value, rightMenuRef.value);
    });
    return () => {
      return (
        <div>
          <div class="h-10">
            <CGXLogo />
          </div>
          <div class="w-full h-full flex justify-between overflow-hidden bg-gray-100 dark:bg-black">
            {/* 编辑器左侧，可选择的组件列表 */}
            <div
              ref={leftMenuRef}
              class={[
                collapseManage.leftMenuCollapseState.value
                  ? "w-[260px]"
                  : "w-0",
                " bg-white h-full transition-all duration-300",
              ]}
            >
              <ElementMenu />
            </div>
            {/* 中间部分 */}
            <div class="h-full flex-1 dark:bg-black">
              {/* 编辑器顶部 */}
              <OperationMenu buttonMap={buttonMap} />
              {/* 编辑器画布的地方 */}
              <div class="box-border">
                {/* 滚动条 */}
                <div class="h-full relative flex justify-center p-5">
                  <EditorCanvas />
                </div>
              </div>
            </div>
            {/* 编辑器右侧 */}
            <div
              class={[
                collapseManage.rightMenuCollapseState.value
                  ? "w-[280px]"
                  : "w-0",
                " bg-white h-full transition-all duration-300",
              ]}
              ref={rightMenuRef}
            >
              <SettingMenu />
            </div>
            {/* 预览dialog */}
            <PreviewDialog ref={previewDialogRef} />
            {/* 导入导出dialog */}
            <ExportSourceCodeDialog ref={exportSourceCodeDialogRef} />
            <ImportSourceCodeDialog ref={importSourceCodeDialogRef} />
          </div>
        </div>
      );
    };
  },
});

export default ElementDesigner;
