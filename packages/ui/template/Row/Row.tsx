import { ElRow } from "element-plus";
import { defineComponent, PropType } from "vue";
import Col from "../Col/Col";
import { IEditorElement } from "cgx-designer";

const Row = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any) {
    return () => {
      return (
        <ElRow class="w-full h-full">
          {props.elementSchema.elementList.map((element: IEditorElement) => {
            // 一定要加key!!!!不加直接出现问题了
            return <Col elementSchema={element} key={element.id} />;
          })}
        </ElRow>
      );
    };
  },
});

export default Row;
