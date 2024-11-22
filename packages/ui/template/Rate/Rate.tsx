import { IEditorElement } from "@cgx-designer/core";
import { ElRate } from "element-plus";
import { defineComponent, PropType } from "vue";

const Rate = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <ElRate {...renderProps}></ElRate>;
    };
  },
});

export default Rate;
