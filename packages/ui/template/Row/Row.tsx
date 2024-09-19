import { ElRow } from "element-plus";
import { defineComponent } from "vue";
import Col from "../Col/Col";
import { IEditorElement } from "cgx-designer";

const Row = defineComponent({
  props: {
    props: Object,
    elementList: Array
  },
  setup(props: any) {
    return () => {
      return (
        <ElRow class="w-full h-full">
          {props.elementList.map((col: IEditorElement) => {
            // 一定要加key!!!!不加直接出现问题了
            return <Col col={col} key={col.id} />
          })}
        </ElRow>
      )
    }
  }
})

export default Row;