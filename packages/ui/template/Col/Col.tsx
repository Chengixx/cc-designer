import { ElCol } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "cgx-designer";

const Col = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any, { slots }) {
    return () => {
      return (
        <ElCol
          span={props.elementSchema.props.span}
          class="border-dashed border border-[#d9d9d9]"
        >
          {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList.map(
              (subcomponentSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: subcomponentSchema,
                })
            )
          )}
        </ElCol>
      );
    };
  },
});

export default Col;
