import { useMergeAttr } from "@cgx-designer/hooks";
import { ElInput } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Textarea = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => <ElInput type="textarea" {...renderProps} />;
  },
});

export default Textarea;
