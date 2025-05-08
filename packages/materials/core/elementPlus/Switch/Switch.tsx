import { IEditorElement } from "@cgx-designer/types";
import { ElSwitch } from "element-plus";
import { isEmpty } from "lodash-es";
import { defineComponent, PropType } from "vue";

const Switch = defineComponent({
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
      return <ElSwitch {...renderProps} />;
    };
  },
});

export default Switch;
