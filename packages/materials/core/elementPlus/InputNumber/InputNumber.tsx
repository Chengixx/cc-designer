import { useMergeAttr } from "@cgx-designer/hooks";
import { ElInputNumber } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const InputNumber = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => <ElInputNumber {...renderProps} />;
  },
});

export default InputNumber;
