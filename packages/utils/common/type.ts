import { FormSetting, IEditorElement } from "cgx-designer";

//用类型断言去判断是不是IEditorElement这个接口
export const isIEditorElementArray = (arr: any[]): arr is IEditorElement[] => {
  if (!Array.isArray(arr)) {
    return false;
  }

  for (let obj of arr) {
    if (
      typeof obj !== "object" ||
      obj === null ||
      !obj.key ||
      typeof obj.key !== "string" ||
      !(typeof obj.id === "string")
    ) {
      return false;
    }

    if (
      obj.elementList !== undefined &&
      !isIEditorElementArray(obj.elementList)
    ) {
      return false;
    }
    if (
      obj.elementList !== undefined &&
      !(Array.isArray(obj.elementList) || obj.elementList.length === 0)
    ) {
      return false;
    }
  }

  return true;
};

//用类型断言去判断是不是Form这个接口
export const isFormSetting = (obj: any): obj is FormSetting => {
  return (
    typeof obj.modelName === "string" &&
    typeof obj.refName === "string" &&
    typeof obj.rulesName === "string" &&
    typeof obj.labelWidth === "number" &&
    ["top", "left", "right"].includes(obj.labelPosition) &&
    ["default", "small", "large"].includes(obj.size)
  );
};

//上面两个方法结合
export const isFormWithEditorElements = (
  obj: any
): obj is { formSetting: FormSetting; elementList: IEditorElement[] } => {
  return (
    typeof obj === "object" &&
    isFormSetting(obj.formSetting) &&
    Array.isArray(obj.elementList) &&
    isIEditorElementArray(obj.elementList)
  );
};
