import { ElCard } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { useMergeAttr } from "@cgx-designer/hooks";

const Card = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      require: false,
      default: () => {},
    },
  },
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
