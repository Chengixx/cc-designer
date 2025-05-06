import { defineComponent, onMounted, provide, ref } from "vue";
import { createOperationButtonSetting } from "./OperationMenu/operationButtonSetting";
import CGXLogo from "./CGXLogo";
import ElementMenu from "./ElementMenu";
import OperationMenu from "./OperationMenu";
import EditorCanvas from "./EditorCanvas";
import SettingMenu from "./SettingMenu";
import PreviewDialog from "./PreviewDialog";
import {
  ExportSourceCodeDialog,
  ImportSourceCodeDialog,
} from "./SourceCodeDialog";
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
import CollapseWidget from "./CollapseWidget";
import { elementController } from "@cgx-designer/controller";
import { Loading } from "@cgx-designer/extensions";
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
        <>
          {!elementController.isReady.value && <Loading />}

          {elementController.isReady.value && (
            <div
              class="c-relative"
              key={elementController.elementLibrary.value!.name || "key"}
            >
              <div class="c-h-12">
                <CGXLogo />
              </div>
              <CollapseWidget />
              <div class="c-w-full c-h-full c-flex c-justify-between c-overflow-hidden c-bg-gray-100 dark:c-bg-black">
                {/* 编辑器左侧，可选择的组件列表 */}
                <div
                  ref={leftMenuRef}
                  class={[
                    collapseManage.leftMenuCollapseState.value
                      ? "c-w-[348px]"
                      : "c-w-[48px]",
                    " c-bg-white c-h-full c-transition-all c-duration-300",
                  ]}
                >
                  <ElementMenu />
                </div>
                {/* 中间部分 */}
                <div class="c-h-full c-flex-1 dark:c-bg-black">
                  {/* 编辑器顶部 */}
                  <OperationMenu buttonMap={buttonMap} />
                  {/* 编辑器画布的地方 */}
                  <div class="c-box-border">
                    {/* 滚动条 */}
                    <div class="c-h-full c-relative c-flex c-justify-center c-px-5 c-py-2">
                      <EditorCanvas />
                    </div>
                  </div>
                </div>
                {/* 编辑器右侧 */}
                <div
                  class={[
                    collapseManage.rightMenuCollapseState.value
                      ? "c-w-[300px]"
                      : "c-w-0",
                    " c-bg-white c-h-full c-transition-all c-duration-300",
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
          )}
        </>
      );
    };
  },
});

export default ElementDesigner;
