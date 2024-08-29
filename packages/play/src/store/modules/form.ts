import { defineStore } from "pinia";
import store from "../index";
import { reactive } from "vue";

export interface FormSetting {
  modelName: string;
  refName: string;
  rulesName: string;
  labelWidth: number;
  labelPosition: "top" | "left" | "right";
  size: "default" | "small" | "large";
}

export const useFormStore = defineStore("form", () => {
  const formSetting: FormSetting = reactive({
    modelName: "formData",
    refName: "formRef",
    rulesName: "formRules",
    labelPosition: "left",
    labelWidth: 90,
    size: "default",
  });

  const setFormSetting = (newSetting: FormSetting) => {
    formSetting.modelName = newSetting.modelName;
    formSetting.refName = newSetting.refName;
    formSetting.rulesName = newSetting.rulesName;
    formSetting.labelPosition = newSetting.labelPosition;
    formSetting.labelWidth = newSetting.labelWidth;
    formSetting.size = newSetting.size;
  };

  return {
    formSetting,
    setFormSetting,
  };
});

/** 在 setup 外使用 */
export function useFormStoreHook() {
  return useFormStore(store);
}
