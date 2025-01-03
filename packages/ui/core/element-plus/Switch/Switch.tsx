import { IEditorElement } from "@cgx-designer/core";
import { ElSwitch } from "element-plus";
import { defineComponent, PropType } from "vue";

const Switch = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <ElSwitch {...renderProps} />;
    };
  },
});

export default Switch;
