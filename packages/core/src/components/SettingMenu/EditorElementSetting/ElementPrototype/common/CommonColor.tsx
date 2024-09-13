import { ElColorPicker, ElFormItem } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";

const CommonColor = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage

    return () => {
      return (
        <ElFormItem label="颜色">
          <ElColorPicker v-model={focusManage.focusedElement.value!.props.color} />
        </ElFormItem>
      );
    };
  },
});
export default CommonColor;
