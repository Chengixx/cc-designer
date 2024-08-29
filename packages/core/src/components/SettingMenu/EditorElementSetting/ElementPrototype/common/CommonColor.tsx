import { ElColorPicker, ElFormItem } from "element-plus";
import { defineComponent } from "vue";
import useFocus from "@/hook/useFocus";

const CommonColor = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();

    return () => {
      return (
        <ElFormItem label="颜色">
          <ElColorPicker v-model={getFocusElement()!.props.color} />
        </ElFormItem>
      );
    };
  },
});
export default CommonColor;
