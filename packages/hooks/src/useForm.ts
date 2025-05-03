import { FormSetting } from "@cgx-designer/types";
import { deepCompareAndModify } from "@cgx-designer/utils";
import { reactive } from "vue";

export type FormManage = ReturnType<typeof useForm>;

export const useForm = () => {
  const formSetting: FormSetting = reactive({});

  const setFormSetting = (newSetting: FormSetting) => {
    deepCompareAndModify(formSetting, newSetting);
  };

  return {
    formSetting,
    setFormSetting,
  };
};
