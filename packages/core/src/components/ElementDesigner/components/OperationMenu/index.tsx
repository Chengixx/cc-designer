import { defineComponent } from "vue";
import { CCButton } from "@cgx-designer/extensions";
import { OperationButtonSetting } from "./operationButtonSetting";

const OperationMenu = defineComponent({
  props: {
    buttonList: {
      type: Array<OperationButtonSetting>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return (
        <div class="h-20  flex justify-center items-center px-2 border bg-white border-blue-100">
          {props.buttonList.map((button, index) => {
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
