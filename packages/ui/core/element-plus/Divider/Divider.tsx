import { IEditorElement } from "@cgx-designer/core";
import { ElDivider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Divider = defineComponent({
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
        <ElDivider {...renderProps}>
          {props.elementSchema.props!.placeholder}
        </ElDivider>
      );
    };
  },
});

export default Divider;
