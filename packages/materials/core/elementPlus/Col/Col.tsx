import { ElCol } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/types";

const Col = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <ElCol span={props.elementSchema.props!.span}>
          {renderSlot(slots, "editNode")}
        </ElCol>
      );
    };
  },
});

export default Col;
