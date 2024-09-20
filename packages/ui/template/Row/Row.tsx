import { ElRow } from "element-plus";
import { defineComponent, PropType, renderSlot } from "vue";
import Col from "../Col/Col";
import { IEditorElement } from "cgx-designer";

const Row = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any, { slots }) {
    console.log(slots,'123');
    return () => {
      return (
        <ElRow class="w-full h-full">
          {/* 这里把儿子传过去 */}
          {/* {slots.node ? slots.node(props.elementSchema.elementList[0]) : null} */}
          {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList.map(
              (subcomponentSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: subcomponentSchema,
                })
            )
          )}
          {/* {props.elementSchema.elementList.map((element: IEditorElement) => {
            // 一定要加key!!!!不加直接出现问题了
            return <Col elementSchema={element} key={element.id} />;
          })} */}
        </ElRow>
      );
    };
  },
});

export default Row;
