import { defineComponent, inject } from "vue";
import { FormManage, QueueManage } from "@cgx-designer/hooks";
import { elementController } from "@cgx-designer/controller";
import { CFormItem } from "@cgx-designer/extensions";
import { ElementEngine } from "@cgx-designer/element-engine";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";

const EditFormSetting = defineComponent({
  setup() {
    const formConfigList =
      elementController.getCurrentElementPlugin()?.formConfig;
    const formManage = inject("formManage") as FormManage;
    const queueManage = inject("queueManage") as QueueManage;
    return () => {
      return (
        <div class="c-h-full c-overflow-y-auto">
          {formConfigList &&
            formConfigList.map((formConfig) => (
              <CFormItem label={formConfig.label || undefined}>
                <ElementEngine
                  elementSchema={{ ...formConfig, formItem: false }}
                  modelValue={getValueByPath(
                    formManage.formSetting,
                    formConfig.field!
                  )}
                  onUpdate:modelValue={(v: any) => {
                    // queueManage.push("formSetting");
                    setValueByPath(
                      formManage.formSetting,
                      formConfig.field!,
                      v
                    );
                  }}
                />
              </CFormItem>
            ))}
        </div>
      );
    };
  },
});

export default EditFormSetting;
