import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadioButton,
  ElRadioGroup,
} from "element-plus";
import { defineComponent, inject } from "vue";
import { FormManage } from "@/hook/useForm";

const EditFormSetting = defineComponent({
  setup() {
    const formManage = inject("formManage") as FormManage

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
              <ElInput placeholder="表单名称" v-model={formManage.formSetting.modelName} />
            </ElFormItem>
            <ElFormItem label="引用名称">
              <ElInput placeholder="表单引用" v-model={formManage.formSetting.refName} />
            </ElFormItem>
            <ElFormItem label="规则名称">
              <ElInput
                placeholder="表单规则名称"
                v-model={formManage.formSetting.rulesName}
              />
            </ElFormItem>
            <ElFormItem label="标签宽度">
              <ElInputNumber
                placeholder="标签宽度"
                v-model={formManage.formSetting.labelWidth}
              />
            </ElFormItem>
            <ElFormItem label="表单大小">
              <ElRadioGroup
                size="small"
                v-model={formManage.formSetting.size}
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
                v-model={formManage.formSetting.labelPosition}
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
