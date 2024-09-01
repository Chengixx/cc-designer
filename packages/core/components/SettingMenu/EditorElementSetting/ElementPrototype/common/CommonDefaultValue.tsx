import { ElFormItem, ElInput } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";

const CommonDefaultValue = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage

    return () => {
      return (
        <ElFormItem label="默认值">
          <ElInput v-model={focusManage.getFocusElement()!.props.defaultValue} />
        </ElFormItem>
      );
    };
  },
});
export default CommonDefaultValue;
