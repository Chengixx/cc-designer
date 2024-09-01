import { IEditorElement } from "@/store/modules/element";
import { ElRow } from "element-plus";
import { defineComponent, h } from "vue";
import Col from "../Col/Col";

const Row = defineComponent({
  props: {
    props: Object,
    cols: Array
  },
  setup(props: any) {
    return () => {
      return (
        <ElRow class="w-full h-full">
          {props.cols.map((col: IEditorElement, index: number) => {
            // 一定要加key!!!!不加直接出现问题了
            return <Col col={col} key={col.id} />
          })}
        </ElRow>
      )
    }
  }
})

export default Row;