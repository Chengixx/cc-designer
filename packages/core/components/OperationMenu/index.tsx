import { defineComponent, inject } from "vue";
import createOperationButtonSetting from "@cgx-designer/utils/core/operationButtonSetting";
import CCButton from "../CCButton/CCButton"
import { FormManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { FocusManage } from "@cgx-designer/hooks";

const OperationMenu = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");
    const focusManage = inject("focusManage") as FocusManage
    const formManage = inject("formManage") as FormManage
    const elementManage = inject("elementManage") as ElementManage
    const buttons = createOperationButtonSetting(formManage, elementManage, focusManage, commands!);
    return () => {
      return (
        <div class="h-20  flex justify-center items-center px-2 border bg-white border-blue-100">
          {buttons.map((button, index) => {
            return (
              <CCButton key={index} onClick={button.handler} class="mx-1">
                {button.label}
              </CCButton>
            );
          })}
        </div>
      );
    };
  },
});
export default OperationMenu;
