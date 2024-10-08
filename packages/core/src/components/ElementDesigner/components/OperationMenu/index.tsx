import { defineComponent } from "vue";
import { CCButton } from "@cgx-designer/ui";
import { OperationButtonSetting } from "@cgx-designer/utils";

const OperationMenu = defineComponent({
  props: {
    buttonList: {
      type: Array<OperationButtonSetting>,
      required: true,
    },
  },
  setup({ buttonList }) {
    return () => {
      return (
        <div class="h-20  flex justify-center items-center px-2 border bg-white border-blue-100">
          {buttonList.map((button, index) => {
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
