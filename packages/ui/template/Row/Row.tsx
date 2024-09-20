import { ElRow } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "cgx-designer";

const Row = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any, { slots }) {
    return () => {
      return (
        <ElRow class="w-full h-full">
          {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList.map(
              (subcomponentSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: subcomponentSchema,
                })
            )
          )}
        </ElRow>
      );
    };
  },
});

export default Row;
