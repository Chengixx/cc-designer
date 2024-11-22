import { IEditorElement } from "@cgx-designer/core";
import { ElButton } from "element-plus";
import { defineComponent, PropType } from "vue";

const Button = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return (
        <ElButton {...renderProps}>{props.elementSchema.props!.label}</ElButton>
      );
    };
  },
});

export default Button;
