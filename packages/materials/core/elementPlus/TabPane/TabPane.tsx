import { ElTabPane } from "element-plus";
import { defineComponent, renderSlot } from "vue";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const TabPane = defineComponent({
  props: createElementProps(),
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
