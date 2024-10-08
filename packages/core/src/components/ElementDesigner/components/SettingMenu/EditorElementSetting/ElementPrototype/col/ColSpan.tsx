import { FocusManage } from "@cgx-designer/hooks";
import { ElFormItem, ElInputNumber } from "element-plus";
import { defineComponent, inject } from "vue";

const ColSpan = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage

    return () => {
      return (
        <ElFormItem label="占位格数">
          <ElInputNumber
            min={1}
            max={24}
            v-model={focusManage.focusedElement.value!.props.span}
            placeholder="请输入"
          />
        </ElFormItem>
      );
    };
  },
});
export default ColSpan;
