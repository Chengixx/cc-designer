import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { elementController } from "@cgx-designer/controller";
import OperationButton from "./OperationButton";

const RightOperationArea = defineComponent({
  props: {
    buttonMap: {
      type: Object as PropType<Record<string, OperationButtonSetting>>,
      required: true,
    },
  },
  setup(props) {
    const isVuetify =
      elementController.getCurrentElementLibraryName() === "vuetify";

    return () => (
      <div
        class={[
          "c-h-full c-flex-1 c-flex c-justify-end c-items-center c-pr-4",
          isVuetify && "c-gap-x-2",
        ]}
      >
        <OperationButton config={props.buttonMap.Import} />
        <OperationButton config={props.buttonMap.Export} />
        <OperationButton config={props.buttonMap.Preview} />
      </div>
    );
  },
});

export default RightOperationArea;
