import { defineComponent, inject } from "vue";
import createOperationButtonSetting from "@/config/operationButtonSetting";
import CCButtonV1 from "@/packages/button/CCButtonV1";

const OperationMenu = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");
    const buttons = createOperationButtonSetting(commands!);
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
