import { useMergeAttr } from "@cgx-designer/hooks";
import { ElRate } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Rate = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElRate {...renderProps}></ElRate>;
    };
  },
});

export default Rate;
