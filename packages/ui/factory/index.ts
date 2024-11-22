export const sizeConfig = {
  label: "大小",
  key: "select",
  field: "props.size",
  props: {
    label: "select",
    multiple: false,
    placeholder: "请选择大小",
    options: [
      { label: "大", value: "large" },
      { label: "中", value: "medium" },
      { label: "小", value: "small" },
    ],
  },
};

export const formItemConfig = [
  {
    label: "字段名",
    key: "input",
    field: "field",
    props: {
      placeholder: "请输入字段名",
    },
  },
  {
    label: "标题名称",
    key: "input",
    field: "props.label",
    props: {
      placeholder: "为空默认使用组件key值",
    },
  },
];

export const ruleConfig = {
  key: "ruleSetting",
  field: "rules",
};

export const clearConfig = {
  label: "可清空",
  key: "switch",
  field: "props.clearable",
};

export const placeholderConfig = {
  label: "占位符",
  key: "input",
  field: "props.placeholder",
  props: {
    placeholder: "请输入占位符",
  },
};

export const disabledConfig = {
  label: "禁用",
  key: "switch",
  field: "props.disabled",
};
