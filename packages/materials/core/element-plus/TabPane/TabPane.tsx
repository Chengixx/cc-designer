import { ElTabPane } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/core";

const TabPane = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <ElTabPane
          label={props.elementSchema.props!.label}
          name={props.elementSchema.props!.name}
        >
          <div class="c-w-full c-min-h-[60px]">{renderSlot(slots, "editNode")}</div>
        </ElTabPane>
      );
    };
  },
});

export default TabPane;
