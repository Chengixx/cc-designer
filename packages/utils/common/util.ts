import { FormSetting, IEditorElement } from "cgx-designer";

//深拷贝
export const deepClone = <T>(obj: T): T => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const newObj = Array.isArray(obj) ? ([] as T) : ({} as T);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        newObj[key] = deepClone(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj as T;
};

//获取一个元素距离顶部距离
export const getDistanceFromTop = (element: HTMLElement): number => {
  const elementRect = element!.getBoundingClientRect();
  const elementTopPosition = elementRect!.top + window.pageYOffset; // 加上页面的滚动偏移量
  return elementTopPosition;
};

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

//拆对象 组新对象
export const createTemplateProps = (props: Record<string, any>) => {
  const attrs = Object.keys(props) as (keyof typeof props)[];
  const templateProps: Partial<typeof props> = {};
  attrs.forEach((attr) => {
    templateProps[attr] = "";
  });

  return templateProps;
};

//字符串第一个字母变大写
export const stringFirstBigger = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//生成不重复的id
export const getRandomId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
