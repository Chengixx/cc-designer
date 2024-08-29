import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadioButton,
  ElRadioGroup,
} from "element-plus";
import { defineComponent } from "vue";
import { useFormStore } from "@/store/modules/form";

const EditFormSetting = defineComponent({
  setup() {
    const { formSetting } = useFormStore();
    const labelPositionList = [
      { label: "左", value: "left" },
      { label: "右", value: "right" },
      { label: "上", value: "top" },
    ];
    const sizeList = [
      { label: "小", value: "small" },
      { label: "中", value: "default" },
      { label: "大", value: "large" },
    ];
    return () => {
      return (
        <div class="h-full overflow-y-auto">
          <ElForm label-width="auto">
            <ElFormItem label="表单名称">
              <ElInput placeholder="表单名称" v-model={formSetting.modelName} />
            </ElFormItem>
            <ElFormItem label="引用名称">
              <ElInput placeholder="表单引用" v-model={formSetting.refName} />
            </ElFormItem>
            <ElFormItem label="规则名称">
              <ElInput
                placeholder="表单规则名称"
                v-model={formSetting.rulesName}
              />
            </ElFormItem>
            <ElFormItem label="标签宽度">
              <ElInputNumber
                placeholder="标签宽度"
                v-model={formSetting.labelWidth}
              />
            </ElFormItem>
            <ElFormItem label="表单大小">
              <ElRadioGroup
                size="small"
                v-model={formSetting.size}
                aria-label="表单标签位置"
              >
                {sizeList.map((item) => (
                  <ElRadioButton value={item.value} key={item.value}>{item.label}</ElRadioButton>
                ))}
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label="标签位置">
              <ElRadioGroup
                size="small"
                v-model={formSetting.labelPosition}
                aria-label="表单标签位置"
              >
                {labelPositionList.map((item) => (
                  <ElRadioButton value={item.value} key={item.value}>{item.label}</ElRadioButton>
                ))}
              </ElRadioGroup>
            </ElFormItem>
          </ElForm>
        </div>
      );
    };
  },
});

export default EditFormSetting;
