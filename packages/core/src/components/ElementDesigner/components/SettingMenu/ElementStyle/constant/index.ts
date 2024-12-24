import { IEditorElement } from "../../../../../../types";

export const defaultStyleSchema: IEditorElement[] = [
  {
    label: "宽度",
    key: "styleInput",
    field: "style.width",
    props: {
      placeholder: "请输入宽度",
      size: "default",
    },
  },
  {
    label: "高度",
    key: "styleInput",
    field: "style.height",
    props: {
      placeholder: "请输入高度",
      size: "default",
    },
  },
  {
    key: "computedStyle",
    field: "style",
    props: {},
  },
];
