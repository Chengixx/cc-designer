import { ElFormItem, ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect } from "element-plus";
import { defineComponent } from "vue";
import useFocus from "@/hook/useFocus";

const CommonLabelPosition = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();
    const labelPositionList = [
      { label: "左", value: "left" },
      { label: "右", value: "right" },
      { label: "上", value: "top" },
    ];
    return () => {
      return (
        <ElFormItem label="对齐方式">
          <ElRadioGroup
            size="small"
            v-model={getFocusElement()!.props.labelPosition}
            aria-label="标签位置"
          >
            {labelPositionList.map((item) => (
              <ElRadioButton value={item.value} key={item.value}>{item.label}</ElRadioButton>
            ))}
          </ElRadioGroup>
        </ElFormItem>
      );
    };
  },
});
export default CommonLabelPosition;
