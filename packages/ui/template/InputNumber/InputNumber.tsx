import { IEditorElement } from "@cgx-designer/core";
import { ElInputNumber } from "element-plus";
import { defineComponent, PropType } from "vue";

const InputNumber = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <ElInputNumber {...renderProps} />;
    };
  },
});

export default InputNumber;
