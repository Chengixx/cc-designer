import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElInput } from "element-plus";
import { defineComponent, PropType } from "vue";

const Textarea = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElInput type="textarea" {...renderProps} />;
    };
  },
});

export default Textarea;
