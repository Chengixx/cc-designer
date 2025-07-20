import { IEditorElement } from "@cgx-designer/types";

export const elementPlusFormConfig: IEditorElement[] = [
  {
    label: "标签宽度",
    key: "inputNumber",
    field: "labelWidth",
    props: {
      defaultValue: 100,
    },
  },
  {
    label: "是否禁用",
    key: "switch",
    field: "disabled",
    props: {
      defaultValue: false,
    },
  },
  {
    label: "表单大小",
    key: "select",
    field: "size",
    props: {
      defaultValue: "default",
      multiple: false,
      placeholder: "请选择大小",
      options: [
        { label: "大", value: "large" },
        { label: "中", value: "default" },
        { label: "小", value: "small" },
      ],
    },
  },
  {
    label: "标签位置",
    key: "select",
    field: "labelPosition",
    props: {
      defaultValue: "left",
      multiple: false,
      placeholder: "请选择位置",
      options: [
        { label: "左", value: "left" },
        { label: "右", value: "right" },
        { label: "上", value: "top" },
      ],
    },
  },
  {
    label: "表单名称",
    key: "input",
    field: "modelName",
    props: {
      placeholder: "请输入表单名称",
    },
  },
  {
    label: "引用名称",
    key: "input",
    field: "refName",
    props: {
      placeholder: "请输入引用名称",
    },
  },
  {
    label: "规则名称",
    key: "input",
    field: "rulesName",
    props: {
      placeholder: "请输入规则名称",
    },
  },
];
