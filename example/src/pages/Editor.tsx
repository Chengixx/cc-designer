import { defineComponent, provide } from "vue";
import ElementMenu from "cgx-designer/components/ElementMenu";
import SettingMenu from "cgx-designer/components/SettingMenu";
import CGXLogo from "cgx-designer/components/CGXLogo";
import EdiorCanvas from "cgx-designer/components/EdiorCanvas";
import OperationMenu from "cgx-designer/components/OperationMenu";
import { useCommand } from "@cgx-designer/hooks";
import { useForm } from "@cgx-designer/hooks";
import { useHover } from "@cgx-designer/hooks";
import { useElement } from "@cgx-designer/hooks";
import { useFocus } from "@cgx-designer/hooks";
//主要画布
const Editor = defineComponent({
  setup() {
    console.log("用的是解耦的");
    const formManage = useForm()
    const hoverManage = useHover()
    const elementManage = useElement()
    const focusManage = useFocus(elementManage);
    const { commands } = useCommand(elementManage, focusManage);
    //因为只能有一个实例 所以用provide注入进去
    provide("focusManage", focusManage);
    provide("elementManage", elementManage);
    provide("hoverManage", hoverManage);
    provide("formManage", formManage);
    provide("commands", commands);
    return () => {
      return (
        <div class="w-full h-full flex justify-between">
          {/* 编辑器左侧，可选择的组件列表 */}
          <div class="w-[280px] bg-white h-full">
            <CGXLogo />
            <ElementMenu />
          </div>
          {/* 中间部分 */}
          <div class="h-full w-full min-w-650px">
            {/* 编辑器顶部 */}
            <OperationMenu />
            {/* 编辑器画布的地方 */}
            <div class="box-border">
              {/* 滚动条 */}
              <div class="overflow-y-scroll h-full relative">
                <EdiorCanvas />
              </div>
            </div>
          </div>
          {/* 编辑器右侧 */}
          <div class="w-[280px] bg-white h-full">
            <SettingMenu />
          </div>
        </div>
      );
    };
  },
});

export default Editor;
