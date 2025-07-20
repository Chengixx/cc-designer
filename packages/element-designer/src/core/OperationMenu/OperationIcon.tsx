import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";

const OperationIcon = defineComponent({
  props: {
    config: {
      type: Object as PropType<OperationButtonSetting>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const handleClick = () => {
      if (!props.disabled && props.config.handler) {
        props.config.handler();
      }
    };

    return () => (
      <div title={props.config.label}>
        <props.config.icon
          class={[
            "c-h-5 c-w-5",
            props.disabled
              ? "c-fill-gray-500 c-cursor-not-allowed"
              : "dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer",
          ]}
          onClick={handleClick}
        />
      </div>
    );
  },
});

export default OperationIcon;
