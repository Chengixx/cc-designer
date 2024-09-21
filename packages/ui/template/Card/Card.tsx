import { ElCard } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import { IEditorElement } from "cgx-designer";

const Card = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any, { slots }) {
    return () => {
      return (
        <div class="p-1 w-full">
          <ElCard class="w-full">
            {{
              header: () => {
                return <div>{props.elementSchema.props!.label}</div>;
              },
              default: () => {
                return (
                  <div class="border-dashed border border-[#d9d9d9]">
                    {renderSlot(slots, "editNode", {}, () =>
                      props.elementSchema.elementList.map(
                        (childElementSchema: IEditorElement) =>
                          renderSlot(slots, "node", {
                            element: childElementSchema,
                          })
                      )
                    )}
                  </div>
                );
              },
            }}
          </ElCard>
        </div>
      );
    };
  },
});

export default Card;
