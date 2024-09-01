import { ElFormItem, ElOption, ElSelect } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@/hook/useFocus";

const CommonSize = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage
    const optionList = [
      { label: "大", value: "large" },
      { label: "中", value: "medium" },
      { label: "小", value: "small" },
    ];
    return () => {
      return (
        <ElFormItem label="尺寸">
          <ElSelect
            v-model={focusManage.getFocusElement()!.props.size}
            placeholder="请选择"
          >
            {optionList.map((item) => (
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
export default CommonSize;
