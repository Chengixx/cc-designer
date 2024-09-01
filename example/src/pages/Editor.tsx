import { defineComponent, provide } from "vue";
import useCommand from "../hook/useCommand";
import ElementMenu from "@/components/ElementMenu";
import SettingMenu from "@/components/SettingMenu";
import CGXLogo from "@/components/CGXLogo";
import EdiorCanvas from "@/components/EdiorCanvas";
import OperationMenu from "@/components/OperationMenu";
import useForm from "@/hook/useForm";
import useHover from "@/hook/useHover";
import useElement from "@/hook/useElement";
import useFocus from "@/hook/useFocus";
//主要画布
const Editor = defineComponent({
  setup() {
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
