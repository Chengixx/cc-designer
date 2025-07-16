import { useMergeAttr } from "@cgx-designer/hooks";
import { ElDivider } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Divider = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);
    return () => (
      <ElDivider {...renderProps}>{renderProps.placeholder}</ElDivider>
    );
  },
});

export default Divider;
