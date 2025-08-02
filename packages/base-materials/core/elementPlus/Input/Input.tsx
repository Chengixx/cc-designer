import { ElInput } from "element-plus";
import { defineComponent } from "vue";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Input = defineComponent({
  props: createElementProps(),
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => <ElInput {...renderProps}>{{ ...slots }}</ElInput>;
  },
});

export default Input;
