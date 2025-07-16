import { ElRow } from "element-plus";
import { defineComponent, renderSlot } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Row = defineComponent({
  props: createElementProps(),
  setup(_, { slots }) {
    return () => {
      return <ElRow>{renderSlot(slots, "editNode")}</ElRow>;
    };
  },
});

export default Row;
