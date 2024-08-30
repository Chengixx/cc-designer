import useFocus from "@/hook/useFocus";
import { ElFormItem, ElOption, ElSelect } from "element-plus";
import { defineComponent } from "vue";

const ButtonType = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();
    const buttonTypeList = [
      { label: "主要", value: "primary" },
      { label: "成功", value: "success" },
      { label: "提醒", value: "warning" },
      { label: "危险", value: "danger" },
      { label: "信息", value: "info" },
      { label: "文本", value: "text" },
      { label: "默认", value: "default" },
    ];
    return () => {
      return (
        <ElFormItem label="按钮类型">
          <ElSelect
            v-model={getFocusElement()!.props.type}
            placeholder="请选择"
          >
            {buttonTypeList.map((item) => (
              <ElOption
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </ElSelect>
        </ElFormItem>
      );
    };
  },
});
export default ButtonType;
