import { FormSetting } from "@cgx-designer/core";
import { reactive } from "vue";

export type FormManage = ReturnType<typeof useForm>;

export const useForm = () => {
  const formSetting: FormSetting = reactive({
    modelName: "formData",
    refName: "formRef",
    rulesName: "formRules",
    labelPosition: "left",
    labelWidth: 100,
    size: "default",
    disabled: false,
  });

  const setFormSetting = (newSetting: FormSetting) => {
    formSetting.modelName = newSetting.modelName;
    formSetting.refName = newSetting.refName;
    formSetting.rulesName = newSetting.rulesName;
    formSetting.labelPosition = newSetting.labelPosition;
    formSetting.labelWidth = newSetting.labelWidth;
    formSetting.size = newSetting.size;
    formSetting.disabled = newSetting.disabled;
    formSetting.on = newSetting.on;
  };

  return {
    formSetting,
    setFormSetting,
  };
};
