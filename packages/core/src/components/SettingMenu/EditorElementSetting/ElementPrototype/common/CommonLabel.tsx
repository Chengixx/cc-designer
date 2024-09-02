import { ElFormItem, ElInput } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";

const CommonLabel = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage

    return () => {
      return (
        <ElFormItem label="标签">
          <ElInput v-model={focusManage.getFocusElement()!.props.label} />
        </ElFormItem>
      );
    };
  },
});
export default CommonLabel;
