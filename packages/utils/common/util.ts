import { elementController } from "@cgx-designer/controller";
import { VBtnColorType } from "@cgx-designer/base-materials";
import { RuleItem } from "@cgx-designer/types";
import { Ref } from "vue";

export const isMac = navigator.userAgent.includes("Mac");

/**
 * 复制文本到剪贴板
 * @param value 要复制的文本
 * @param successCb 成功回调
 * @param errorCb 错误回调
 */
export const copyToClipboard = async (
  value: string,
  successCb?: () => void,
  errorCb?: () => void
): Promise<void> => {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      successCb?.();
      return;
    }

    // 降级到 execCommand
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.cssText =
      "position:fixed;opacity:0;left:-999999px;top:-999999px;";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (success) {
      successCb?.();
    } else {
      errorCb?.();
    }
  } catch (error) {
    errorCb?.();
  }
};

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // 处理 ArrayBuffer 对象
  if (obj instanceof ArrayBuffer) {
    return obj.slice(0) as T;
  }

  // 处理 TypedArray 对象
  if (ArrayBuffer.isView(obj)) {
    return new (obj.constructor as any)(obj) as T;
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // 处理 Map 对象
  if (obj instanceof Map) {
    const newMap = new Map();
    obj.forEach((value, key) => {
      newMap.set(deepClone(key), deepClone(value));
    });
    return newMap as T;
  }

  // 处理 Set 对象
  if (obj instanceof Set) {
    const newSet = new Set();
    obj.forEach((value) => {
      newSet.add(deepClone(value));
    });
    return newSet as T;
  }

  // 处理普通对象和数组
  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (newObj as any)[key] = deepClone((obj as any)[key]);
    }
  }

  return newObj as T;
};

/**
 * 字符串首字母大写
 * @param str 输入字符串
 * @returns 首字母大写的字符串
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 字符串首字母小写
 * @param str 输入字符串
 * @returns 首字母小写的字符串
 */
export const lowercaseFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * 生成随机ID
 * @param length ID长度，默认8位
 * @returns 随机ID字符串
 */
export const getRandomId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

/**
 * 根据路径获取对象值
 * @param object 目标对象
 * @param path 属性路径，支持点号和方括号语法
 * @param defaultValue 默认值
 * @returns 获取到的值或默认值
 */
export const getValueByPath = (
  object: Record<string, any>,
  path: string,
  defaultValue?: any
): any => {
  if (!path || !object) return defaultValue;

  const pathArray = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  const result = pathArray.reduce((acc, key) => {
    return acc != null && acc !== undefined ? acc[key] : undefined;
  }, object);

  return result === undefined ? defaultValue : result;
};

/**
 * 根据路径设置对象值
 * @param object 目标对象
 * @param path 属性路径，支持点号和方括号语法
 * @param value 要设置的值
 * @returns 修改后的对象
 */
export const setValueByPath = (
  object: Record<string, any>,
  path: string,
  value: any
): Record<string, any> => {
  if (!path || !object) return object;

  const pathArray = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let current = object;

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    const nextKey = pathArray[i + 1];

    if (current[key] == null) {
      // 根据下一个键的类型决定创建对象还是数组
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }

  const lastKey = pathArray[pathArray.length - 1];
  current[lastKey] = value;

  return object;
};

/**
 * 深度比较并修改对象
 * @param obj1 目标对象
 * @param obj2 源对象
 * @param shouldDelete 是否删除obj1中存在但obj2中不存在的属性
 */
export const deepCompareAndModify = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  shouldDelete: boolean = true
): void => {
  if (!obj1 || !obj2) return;

  // 更新和添加属性
  for (const [key, val2] of Object.entries(obj2)) {
    const val1 = obj1[key];

    if (
      val1 &&
      val2 &&
      typeof val1 === "object" &&
      typeof val2 === "object" &&
      !Array.isArray(val1) &&
      !Array.isArray(val2)
    ) {
      // 递归处理嵌套对象
      deepCompareAndModify(val1, val2, shouldDelete);
    } else if (Array.isArray(val1) !== Array.isArray(val2)) {
      // 类型不匹配时，用新值替换
      obj1[key] = val2;
    } else {
      // 直接赋值
      obj1[key] = val2;
    }
  }

  // 删除属性
  if (shouldDelete) {
    const keysToDelete = Object.keys(obj1).filter((key) => !(key in obj2));

    for (const key of keysToDelete) {
      if (Array.isArray(obj1)) {
        obj1.splice(Number(key), 1);
      } else {
        delete obj1[key];
      }
    }
  }
};

/**
 * 判断值是否为空
 * @param value 要检查的值
 * @returns 是否为空
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;

  switch (typeof value) {
    case "string":
      return value.length === 0;
    case "object":
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
      }
      return Object.keys(value).length === 0;
    default:
      return false;
  }
};

/**
 * 转换校验规则为函数数组
 * @param validatorList 校验规则列表
 * @returns 校验函数数组
 */
export const transformValidatorArray = (validatorList: RuleItem[]): any[] => {
  if (!Array.isArray(validatorList)) return [];

  return validatorList
    .filter((rule) => rule && typeof rule === "object")
    .map((ruleItem) => {
      try {
        if ("required" in ruleItem) {
          // 必填校验
          return (value: any) => {
            if (!value || (typeof value === "string" && value.trim() === "")) {
              return ruleItem.message || "此字段为必填项";
            }
            return true;
          };
        } else if (ruleItem.prototype) {
          // 自定义校验函数
          return new Function("value", ruleItem.prototype);
        }
        return null;
      } catch (error) {
        console.warn("Invalid validator rule:", ruleItem, error);
        return null;
      }
    })
    .filter(Boolean);
};

/**
 * exposeDom 暴露组件实例
 * @param {Ref<any>} elementRef 接受一个ref
 * @returns 返回的是代理对象
 */
export const exposeDom = <T>(elementRef: Ref<T | null>) =>
  new Proxy(
    {},
    {
      //使用的时候 直接返回实例中的属性或者方法
      get(_, key) {
        return elementRef.value?.[key];
      },
      //这个是因为vue中做了特殊处理 所以需要对实例对象进行特殊处理
      has(_, key) {
        return key in (elementRef.value || {});
      },
      //请注意 我们需要对实例对象进行特殊处理的话 必须也要实现set方法，否则会被proxy拦截
      set(_, key, value) {
        if (elementRef.value) {
          elementRef.value[key] = value;
          return true;
        }
        return false;
      },
    }
  );

/**
 * 根据当前组件库计算按钮颜色
 * @param type 按钮颜色类型
 * @returns 按钮颜色值或undefined
 */
export const computedButtonColor = (type: keyof typeof VBtnColorType) =>
  elementController.getCurrentElementLibraryName() === "vuetify"
    ? VBtnColorType[type]
    : undefined;
