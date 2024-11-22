import { ElCard } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "@cgx-designer/core";

const Card = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class="p-1 w-full">
          <ElCard class="w-full" shadow={props.elementSchema.props!.shadow}>
            {{
              header: () => {
                return <>{props.elementSchema.props!.label}</>;
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
