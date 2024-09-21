import { defineComponent, provide, ref } from "vue";
import ElementMenu from "cgx-designer/src/components/ElementMenu";
import SettingMenu from "cgx-designer/src/components/SettingMenu";
import CGXLogo from "cgx-designer/src/components/CGXLogo";
import EdiorCanvas from "cgx-designer/src/components/EdiorCanvas";
import OperationMenu from "cgx-designer/src/components/OperationMenu";
import { elementConfig } from "@cgx-designer/utils";
import { useCommand } from "@cgx-designer/hooks";
import { useForm } from "@cgx-designer/hooks";
import { useHover } from "@cgx-designer/hooks";
import { useElement } from "@cgx-designer/hooks";
import { useFocus } from "@cgx-designer/hooks";
import PreviewDialog from "../PreviewDialog";
//主要画布
const Container = defineComponent({
  setup() {
    const formManage = useForm();
    const hoverManage = useHover();
    const elementManage = useElement();
    const focusManage = useFocus(elementManage);
    const { commands } = useCommand(elementManage, focusManage);
    //因为只能有一个实例 所以用provide注入进去
    provide("elementConfig", elementConfig);
    provide("focusManage", focusManage);
    provide("elementManage", elementManage);
    provide("hoverManage", hoverManage);
    provide("formManage", formManage);
    provide("commands", commands);

    //dialog实例
    const pDialogRef = ref<InstanceType<typeof PreviewDialog> | null>(null);
    const handleShow = () => {
      pDialogRef.value?.open();
    };
    return () => {
      return (
        <div class="w-full h-full flex justify-between overflow-hidden">
          {/* 编辑器左侧，可选择的组件列表 */}
          <div class="w-[280px] bg-white h-full">
            <CGXLogo />
            <ElementMenu />
          </div>
          {/* 中间部分 */}
          <div class="h-full w-full min-w-650px">
            {/* 编辑器顶部 */}
            <OperationMenu />
            <button onClick={handleShow}>按钮</button>
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
          <PreviewDialog ref={pDialogRef} />
        </div>
      );
    };
  },
});

export default Container;
