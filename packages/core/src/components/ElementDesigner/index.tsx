import { defineComponent, provide, ref } from "vue";
import { createOperationButtonSetting } from "./components/OperationMenu/operationButtonSetting";
import { useCommand, useFunction } from "@cgx-designer/hooks";
import { useForm } from "@cgx-designer/hooks";
import { useHover } from "@cgx-designer/hooks";
import { useElement } from "@cgx-designer/hooks";
import { useFocus } from "@cgx-designer/hooks";
import CGXLogo from "./components/CGXLogo";
import ElementMenu from "./components/ElementMenu";
import OperationMenu from "./components/OperationMenu";
import EditorCanvas from "./components/EditorCanvas";
import SettingMenu from "./components/SettingMenu";
import PreviewDialog from "./components/PreviewDialog";
import { SourceCodeDialog } from "./components/SourceCodeDialog";
//主要画布
const ElementDesigner = defineComponent({
  setup() {
    //dialog实例
    const previewDialogRef = ref<any>(null);
    const sourceCodeDialogRef = ref<any>(null);
    const showPreviewDialog = () => {
      previewDialogRef.value?.open();
    };
    const showSourceCodeDialog = (value: any) => {
      sourceCodeDialogRef.value.showDialog(value);
    };
    const formManage = useForm();
    const elementManage = useElement();
    const hoverManage = useHover(elementManage);
    const focusManage = useFocus(elementManage);
    const { commands } = useCommand(elementManage, focusManage);
    const functionManage = useFunction(elementManage);
    //因为只能有一个实例 所以用provide注入进去
    provide("focusManage", focusManage);
    provide("elementManage", elementManage);
    provide("hoverManage", hoverManage);
    provide("formManage", formManage);
    provide("commands", commands);
    provide("functionManage", functionManage);
    const buttonMap = createOperationButtonSetting(
      formManage,
      elementManage,
      functionManage,
      focusManage,
      commands!,
      showPreviewDialog as () => void,
      showSourceCodeDialog
    );
    return () => {
      return (
        <div>
          <div class="h-10">
            <CGXLogo />
          </div>
          <div class="w-full h-full flex justify-between overflow-hidden bg-gray-100">
            {/* 编辑器左侧，可选择的组件列表 */}
            <div class="w-[280px] bg-white h-full">
              <ElementMenu />
            </div>
            {/* 中间部分 */}
            <div class="h-full w-full min-w-[650px]">
              {/* 编辑器顶部 */}
              <OperationMenu buttonMap={buttonMap} />
              {/* 编辑器画布的地方 */}
              <div class="box-border">
                {/* 滚动条 */}
                <div class="h-full relative">
                  <EditorCanvas />
                </div>
              </div>
            </div>
            {/* 编辑器右侧 */}
            <div class="w-[280px] bg-white h-full">
              <SettingMenu />
            </div>
            {/* 预览dialog */}
            <PreviewDialog ref={previewDialogRef} />
            {/* 导入导出dialog */}
            <SourceCodeDialog ref={sourceCodeDialogRef} />
          </div>
        </div>
      );
    };
  },
});

export default ElementDesigner;
