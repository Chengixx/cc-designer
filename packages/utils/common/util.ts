import { RuleItem } from "@cgx-designer/types";
import { isArray } from "lodash-es";
import { Ref } from "vue";

//复制
export const copyToClipboard = (
  value: string,
  successCb?: () => void,
  errorCb?: () => void
) => {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    return navigator.clipboard
      .writeText(value)
      .then(() => {
        if (successCb) {
          successCb();
        }
      })
      .catch(() => {
        if (errorCb) {
          errorCb();
        }
      });
  } else if (document.execCommand("copy")) {
    var textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const isCopy = document.execCommand("copy");
    if (isCopy) {
      if (successCb) {
        successCb();
      }
    } else {
      if (errorCb) {
        errorCb();
      }
    }
    textArea.remove();
  }
};

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

//字符串第一个字母变大写
export const stringFirstBigger = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
//字符串第一个字母变小写
export const stringFirstSmaller = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
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

//根据路径获取值
export const getValueByPath = (
  object: Record<string, any>,
  path: string,
  defaultValue?: any
): any => {
  if (!path) return defaultValue;
  const pathArray = path.split(".");
  const result = pathArray.reduce((acc, key) => {
    return acc != null ? acc[key] : undefined;
  }, object);
  return result === undefined ? defaultValue : result;
};

//根据路径赋值
export const setValueByPath = (
  object: Record<string, any>,
  path: string,
  value: any
): Record<string, any> => {
  const pathArray = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
  pathArray.reduce((acc, key, index) => {
    if (index === pathArray.length - 1) {
      acc[key] = value;
    } else {
      if (acc[key] == null) {
        acc[key] = isNaN(Number(pathArray[index + 1])) ? {} : [];
      }
    }
    return acc[key];
  }, object);

  return object;
};

//深比较并修改
export const deepCompareAndModify = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  shouldDelete: boolean = true
): void => {
  for (const [key, val2] of Object.entries(obj2)) {
    let val1 = obj1?.[key];
    if (val1 && val2 && typeof val1 === "object" && typeof val2 === "object") {
      if (Array.isArray(val1) && !Array.isArray(val2)) {
        val1 = obj1[key] = {};
      } else if (!Array.isArray(val1) && Array.isArray(val2)) {
        val1 = obj1[key] = [];
      }
      deepCompareAndModify(val1, val2, shouldDelete);
    } else {
      obj1[key] = val2;
    }
  }

  if (shouldDelete) {
    Object.keys(obj1)
      .reverse()
      .forEach((key) => {
        if (obj2.hasOwnProperty(key)) {
          return;
        }
        if (Array.isArray(obj1)) {
          obj1.splice(Number(key), 1);
        } else {
          delete obj1[key];
        }
      });
  }
};

//判断是否为空
export const isEmpty = (value: any) => {
  if (value == null) return true;

  if (typeof value === "object") {
    if (Array.isArray(value) || value instanceof Map || value instanceof Set) {
      return (value as any[]).length === 0 || (value as Set<any>).size === 0;
    }

    return Object.keys(value).length === 0;
  }

  if (typeof value === "string") {
    return value.length === 0;
  }

  return false;
};

//把校验方法的原型通过匿名函数创建成一个数组(目前主要是vuetify)
export const transformValidatorArray = (validatorList: RuleItem[]): any[] => {
  const targetList: any[] = [];
  validatorList.forEach((ruleItem) => {
    if (Object.keys(ruleItem).includes("required")) {
      // 如果是require的内容
      const fnc = new Function(
        "value",
        `if(!value) {
          return '${ruleItem.message}'}
        else {
          return true
        }`
      );
      targetList.push(fnc);
    } else {
      try {
        //普通的函数原型
        const fnc = new Function("value", ruleItem.prototype!);
        targetList.push(fnc);
      } catch (error) {}
    }
  });
  return targetList;
};

/**
 * exposeDom 暴露组件实例
 * @param {Ref<any>} elementRef 接受一个ref
 * @returns 返回的是代理对象
 */
export function exposeDom<T>(elementRef: Ref<T | null>) {
  return new Proxy(
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
}
