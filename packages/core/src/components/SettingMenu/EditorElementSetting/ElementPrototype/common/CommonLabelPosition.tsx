import { ElFormItem, ElRadioButton, ElRadioGroup } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";

const CommonLabelPosition = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage
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
            v-model={focusManage.getFocusElement()!.props.labelPosition}
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
