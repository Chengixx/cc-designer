import { useMergeAttr } from "@cgx-designer/hooks";
import { ElSwitch } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Switch = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElSwitch {...renderProps} />;
    };
  },
});

export default Switch;
