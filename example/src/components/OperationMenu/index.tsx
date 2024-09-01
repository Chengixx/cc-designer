import { defineComponent, inject } from "vue";
import createOperationButtonSetting from "@/config/operationButtonSetting";
import CCButtonV1 from "@/packages/button/CCButtonV1";
import { FormManage } from "@/hook/useForm";
import { ElementManage } from "@/hook/useElement";
import { FocusManage } from "@/hook/useFocus";

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
              <CCButtonV1 key={index} onClick={button.handler} class="mx-1">
                {button.label}
              </CCButtonV1>
            );
          })}
        </div>
      );
    };
  },
});
export default OperationMenu;
