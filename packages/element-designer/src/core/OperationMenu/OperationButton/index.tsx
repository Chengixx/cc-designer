import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "../operationButtonSetting";
import { elementController } from "@cgx-designer/controller";

type ButtonType =
  | ""
  | "default"
  | "text"
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "danger";

const OperationButton = defineComponent({
  props: {
    config: {
      type: Object as PropType<OperationButtonSetting>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<ButtonType>,
      default: "",
    },
  },
  setup(props) {
    const Button = elementController.getElementRender("button");
    const isVuetify =
      elementController.getCurrentElementLibraryName() === "vuetify";

    const renderProps = {
      icon: !isVuetify && props.config.icon,
      variant: "outlined",
      onClick: props.config.handler,
      disabled: props.disabled,
      type: props.type,
      size: "small",
    };

    return () => (
      <Button {...renderProps}>
        {{
          prepend: () => (
            <props.config.icon class="c-h-4 c-w-4 dark:c-fill-white" />
          ),
          default: () => <span>{props.config.label}</span>,
        }}
      </Button>
    );
  },
});

export default OperationButton;
