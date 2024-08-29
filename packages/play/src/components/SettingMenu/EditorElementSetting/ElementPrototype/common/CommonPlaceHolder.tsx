import useFocus from "@/hook/useFocus";
import { ElFormItem, ElInput } from "element-plus";
import { defineComponent } from "vue";

const CommonPlaceHolder = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();
    return () => {
      return (
        <ElFormItem label="占位字符">
          <ElInput
            v-model={getFocusElement()!.props.placeHolder}
            placeholder="请输入占位字符"
          />
        </ElFormItem>
      );
    };
  },
});
export default CommonPlaceHolder;
