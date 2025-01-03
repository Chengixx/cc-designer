import { ElRow } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/core";

const Row = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { slots }) {
    return () => {
      return <ElRow>{renderSlot(slots, "editNode")}</ElRow>;
    };
  },
});

export default Row;
