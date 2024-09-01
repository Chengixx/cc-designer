import { ElFormItem, ElInput } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@/hook/useFocus";


const CommonPlaceHolder = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage

    return () => {
      return (
        <ElFormItem label="占位字符">
          <ElInput
            v-model={focusManage.getFocusElement()!.props.placeHolder}
            placeholder="请输入占位字符"
          />
        </ElFormItem>
      );
    };
  },
});
export default CommonPlaceHolder;
