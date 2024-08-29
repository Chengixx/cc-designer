import useFocus from "@/hook/useFocus";
import { ElFormItem, ElInputNumber } from "element-plus";
import { defineComponent } from "vue";

const ColSpan = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();

    return () => {
      return (
        <ElFormItem label="占位格数">
          <ElInputNumber
            min={1}
            max={24}
            v-model={getFocusElement()!.props.span}
            placeholder="请输入"
          />
        </ElFormItem>
      );
    };
  },
});
export default ColSpan;
