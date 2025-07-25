import { IElementSchema } from "@cgx-designer/types";
import { vuetifyConfig } from "./vuetify";

export const vuetifyFormConfig: IElementSchema[] = [
  {
    label: "是否禁用",
    key: "switch",
    field: "disabled",
    props: {
      defaultValue: false,
      ...vuetifyConfig
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
      ...vuetifyConfig
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
      ...vuetifyConfig
    },
  },
  {
    label: "表单名称",
    key: "input",
    field: "modelName",
    props: {
      placeholder: "请输入表单名称",
      ...vuetifyConfig
    },
  },
  {
    label: "引用名称",
    key: "input",
    field: "refName",
    props: {
      placeholder: "请输入引用名称",
      ...vuetifyConfig
    },
  },
  {
    label: "规则名称",
    key: "input",
    field: "rulesName",
    props: {
      placeholder: "请输入规则名称",
      ...vuetifyConfig
    },
  },
];
