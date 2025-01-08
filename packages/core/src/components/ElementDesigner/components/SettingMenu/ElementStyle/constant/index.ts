import { IEditorElement } from "../../../../../../types";

export const defaultStyleSchema: IEditorElement[] = [
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
    key: "computedStyle",
    field: "style",
    props: {},
  },
];
