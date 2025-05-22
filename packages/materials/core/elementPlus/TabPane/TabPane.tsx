import { ElTabPane } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { useMergeAttr } from "@cgx-designer/hooks";

const TabPane = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots, attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <ElTabPane label={renderProps.label} name={renderProps.name}>
          <div class="c-w-full c-min-h-[60px]">
            {renderSlot(slots, "editNode")}
          </div>
        </ElTabPane>
      );
    };
  },
});

export default TabPane;
