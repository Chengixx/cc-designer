import { ElCard } from "element-plus";
import { defineComponent, renderSlot } from "vue";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Card = defineComponent({
  props: createElementProps(),
  setup(props, { slots, attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <div class="c-p-1 c-w-full">
          <ElCard class="c-w-full" shadow={renderProps.shadow}>
            {{
              header: () => {
                return <>{renderProps.label}</>;
              },
              default: () => {
                return <>{renderSlot(slots, "editNode")}</>;
              },
            }}
          </ElCard>
        </div>
      );
    };
  },
});

export default Card;
