import { ElCol } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "cgx-designer";

const Col = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <ElCol
          span={props.elementSchema.props.span}
          class=""
        >
          {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList!.map(
              (childElementSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: childElementSchema,
                })
            )
          )}
        </ElCol>
      );
    };
  },
});

export default Col;
