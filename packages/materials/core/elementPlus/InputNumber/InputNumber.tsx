import { IEditorElement } from "@cgx-designer/core";
import { ElInputNumber } from "element-plus";
import { isEmpty } from "lodash";
import { defineComponent, PropType } from "vue";

const InputNumber = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      return <ElInputNumber {...renderProps} />;
    };
  },
});

export default InputNumber;
