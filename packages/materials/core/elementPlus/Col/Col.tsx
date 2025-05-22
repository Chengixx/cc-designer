import { ElCol } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { useMergeAttr } from "@cgx-designer/hooks";

const Col = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
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
