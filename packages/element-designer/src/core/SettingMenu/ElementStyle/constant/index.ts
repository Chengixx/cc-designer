import { IElementSchema } from "@cgx-designer/types";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";

export const defaultStyleSchema: IElementSchema[] = [
  {
    key: "styleIDE",
    field: "style",
    props: {},
  },
  {
    label: "宽度",
    key: "styleInput",
    field: "style.width",
    props: {
      placeholder: "请输入宽度",
    },
  },
  {
    label: "高度",
    key: "styleInput",
    field: "style.height",
    props: {
      placeholder: "请输入高度",
    },
  },
  {
    label: "透明度",
    key: "slider",
    getter: (values: IElementSchema) => {
      const innerValue = getValueByPath(values, "style.opacity");
      if (!innerValue) return 100;
      if (typeof innerValue === "number") return innerValue;
      return Number(innerValue.replace("%", ""));
    },
    setter: (values: IElementSchema, value: any, field = "style.opacity") => {
      if (typeof value === "undefined") return;
      const innerValue = `${value}%`;
      setValueByPath(values, field, innerValue);
    },
  },
  {
    key: "computedStyle",
    field: "style",
    props: {},
  },
];
