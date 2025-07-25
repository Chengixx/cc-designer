import { FormSetting, IElementSchema } from "@cgx-designer/types";
import { SourceDataItem } from "@cgx-designer/hooks";

//用类型断言去判断是不是IElementSchema这个接口
export const isIElementSchemaArray = (arr: any[]): arr is IElementSchema[] => {
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
      !isIElementSchemaArray(obj.elementList)
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

//上面两个方法结合
export const checkCJsonType = (
  obj: any
): obj is {
  formSetting: FormSetting;
  elementList: IElementSchema[];
  script: string;
  sourceData: SourceDataItem[];
} => {
  return (
    typeof obj === "object" &&
    typeof obj.script === "string" &&
    typeof obj.formSetting === "object" &&
    Array.isArray(obj.elementList) &&
    isIElementSchemaArray(obj.elementList)
  );
};
