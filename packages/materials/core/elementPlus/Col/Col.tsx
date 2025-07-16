import { ElCol } from "element-plus";
import { defineComponent, renderSlot } from "vue";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Col = defineComponent({
  props: createElementProps(),
  setup(props, { slots, attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <ElCol span={renderProps.span}>{renderSlot(slots, "editNode")}</ElCol>
      );
    };
  },
});

export default Col;
