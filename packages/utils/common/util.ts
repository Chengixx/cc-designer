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

//拆对象 组新对象
export const createEmptyObj = (
  props: Record<string, any>
): Record<string, any> => {
  const templateProps: Record<string, any> = {};

  Object.keys(props).forEach((key) => {
    if (
      typeof props[key] === "object" &&
      !Array.isArray(props[key]) &&
      props[key] !== null
    ) {
      // 如果是对象，则递归调用
      templateProps[key] = createEmptyObj(props[key]);
    } else {
      // 否则设置为 null
      templateProps[key] = null;
    }
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

/**
 * 从嵌套对象中提取值
 * @param object - 要访问的对象
 * @param path - 点分隔的路径字符串
 * @param defaultValue - 如果路径不存在，返回的默认值
 * @returns 通过路径获取的值
 */
export function getValueByPath(
  object: Record<string, any>,
  path: string,
  defaultValue?: any
): any {
  // 将路径字符串拆分为数组
  const pathArray = path.split(".");

  // 逐步从对象中提取值
  let result = object;
  for (let i = 0; i < pathArray.length; i++) {
    if (result == null) {
      // 如果中间的值为 null 或 undefined，返回默认值
      return defaultValue;
    }
    result = result[pathArray[i]];
  }

  // 如果最终的值为 undefined，返回默认值
  return result === undefined ? defaultValue : result;
}

/**
 * 在嵌套对象中设置值
 * @param obj - 要修改的对象
 * @param path - 点分隔的路径字符串
 * @param value - 要设置的值
 * @returns 修改后的对象
 */
export function setValueByPath(
  object: Record<string, any>,
  path: string,
  value: any
): Record<string, any> {
  // 将路径字符串拆分为数组
  const pathArray = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  // 逐步设置对象中的值
  let current = object;

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];

    // 如果当前对象的属性不存在，则创建一个新对象或数组
    if (current[key] == null) {
      // 如果路径部分是数字，创建数组；否则，创建对象
      current[key] = isNaN(Number(pathArray[i + 1])) ? {} : [];
    }

    current = current[key];
  }

  // 在路径的最后一层设置值
  current[pathArray[pathArray.length - 1]] = value;

  return object;
}
