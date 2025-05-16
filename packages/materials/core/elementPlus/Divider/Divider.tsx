import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElDivider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Divider = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps = useMergeAttr(props, attrs);
      return <ElDivider {...renderProps}>{renderProps.placeholder}</ElDivider>;
    };
  },
});

export default Divider;
