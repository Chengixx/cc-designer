import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import OperationIcon from "./OperationIcon";

const LeftOperationArea = defineComponent({
  props: {
    buttonMap: {
      type: Object as PropType<Record<string, OperationButtonSetting>>,
      required: true,
    },
    undoDisabled: {
      type: Boolean,
      required: true,
    },
    redoDisabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="c-h-full c-flex-1 c-flex c-items-center c-gap-x-4 c-pl-4">
        <OperationIcon config={props.buttonMap.Undo} disabled={props.undoDisabled} />
        <OperationIcon config={props.buttonMap.Redo} disabled={props.redoDisabled} />
        <OperationIcon config={props.buttonMap.Clear} />
        <OperationIcon config={props.buttonMap.Message} />
      </div>
    );
  },
});

export default LeftOperationArea; 