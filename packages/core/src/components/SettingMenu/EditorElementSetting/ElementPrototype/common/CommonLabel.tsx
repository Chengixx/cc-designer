import { ElFormItem, ElInput } from "element-plus";
import { defineComponent } from "vue";
import useFocus from "@/hook/useFocus";

const CommonLabel = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();

    return () => {
      return (
        <ElFormItem label="标签">
          <ElInput v-model={getFocusElement()!.props.label} />
        </ElFormItem>
      );
    };
  },
});
export default CommonLabel;
