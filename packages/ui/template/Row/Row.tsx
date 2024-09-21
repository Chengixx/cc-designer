import { ElRow } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "cgx-designer";

const Row = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <ElRow class="w-full h-full">
          {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList!.map(
              (childElementSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: childElementSchema,
                })
            )
          )}
        </ElRow>
      );
    };
  },
});

export default Row;
