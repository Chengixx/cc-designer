import { defineComponent, provide, ref } from "vue";
import {
  createOperationButtonSetting,
  elementConfig,
} from "@cgx-designer/utils";
import { useCommand } from "@cgx-designer/hooks";
import { useForm } from "@cgx-designer/hooks";
import { useHover } from "@cgx-designer/hooks";
import { useElement } from "@cgx-designer/hooks";
import { useFocus } from "@cgx-designer/hooks";
import CGXLogo from "./components/CGXLogo";
import ElementMenu from "./components/ElementMenu";
import OperationMenu from "./components/OperationMenu";
import EdiorCanvas from "./components/EdiorCanvas";
import SettingMenu from "./components/SettingMenu";
import PreviewDialog from "./components/PreviewDialog";
//主要画布
const ElementDesigner = defineComponent({
  setup() {
    //dialog实例
    const dialogRef = ref<any>(null);
    const showPreviewDialog = () => {
      dialogRef.value?.open();
    };
    const formManage = useForm();
    const elementManage = useElement();
    const hoverManage = useHover(elementManage);
    const focusManage = useFocus(elementManage);
    const { commands } = useCommand(elementManage, focusManage);
    //因为只能有一个实例 所以用provide注入进去
    provide("elementConfig", elementConfig);
    provide("focusManage", focusManage);
    provide("elementManage", elementManage);
    provide("hoverManage", hoverManage);
    provide("formManage", formManage);
    provide("commands", commands);
    const buttonList = createOperationButtonSetting(
      formManage,
      elementManage,
      focusManage,
      commands!,
      showPreviewDialog as () => void
    );
    return () => {
      return (
        <div class="w-full h-full flex justify-between overflow-hidden">
          {/* 编辑器左侧，可选择的组件列表 */}
          <div class="w-[280px] bg-white h-full">
            <CGXLogo />
            <ElementMenu />
          </div>
          {/* 中间部分 */}
          <div class="h-full w-full min-w-[650px]">
            {/* 编辑器顶部 */}
            <OperationMenu buttonList={buttonList} />
            {/* 编辑器画布的地方 */}
            <div class="box-border">
              {/* 滚动条 */}
              <div class="h-full relative">
                <EdiorCanvas />
              </div>
            </div>
          </div>
          {/* 编辑器右侧 */}
          <div class="w-[280px] bg-white h-full">
            <SettingMenu />
          </div>
          <PreviewDialog ref={dialogRef} />
        </div>
      );
    };
  },
});

export default ElementDesigner;
