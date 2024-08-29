import { ElFormItem, ElInput } from "element-plus";
import { defineComponent } from "vue";
import useFocus from "@/hook/useFocus";

const CommonDefaultValue = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();

    return () => {
      return (
        <ElFormItem label="默认值">
          <ElInput v-model={getFocusElement()!.props.defaultValue} />
        </ElFormItem>
      );
    };
  },
});
export default CommonDefaultValue;
