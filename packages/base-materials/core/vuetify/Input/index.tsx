import { IElementBaseSetting } from "@cgx-designer/controller";
import { InputIcon } from "@cgx-designer/icons";

const Input: IElementBaseSetting = {
  key: "input",
  icon: InputIcon,
  label: "输入框",
  render: () => import("./Input"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      field: "input-" + id,
      key: "input",
      formItem: true,
      noShowFormItem: true,
      props: {
        variant: "filled",
        label: "input",
        placeholder: "placeholder",
        hideDetails: true,
      },
    };
  },
  config: {
    attribute: [
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
      {
        label: "占位符",
        key: "input",
        field: "props.placeholder",
        props: {
          placeholder: "请输入占位符",
        },
      },
      {
        label: "默认值",
        key: "input",
        field: "props.defaultValue",
      },
      {
        label: "隐藏提示",
        key: "switch",
        field: "props.hideDetails",
      },
      {
        label: "提示",
        key: "input",
        field: "props.hint",
        props: {
          placeholder: "请输入提示",
        },
      },
      {
        label: "变体",
        key: "select",
        field: "props.variant",
        props: {
          multiple: false,
          placeholder: "请选择变体",
          options: [
            { label: "outlined", value: "outlined" },
            { label: "plain", value: "plain" },
            { label: "underlined", value: "underlined" },
            { label: "filled", value: "filled" },
            { label: "solo", value: "solo" },
            { label: "solo-inverted", value: "solo-inverted" },
            { label: "solo-filled", value: "solo-filled" },
          ],
        },
      },
      {
        label: "禁用",
        key: "switch",
        field: "props.disabled",
      },
      {
        label: "可清空",
        key: "switch",
        field: "props.clearable",
      },
      {
        key: "customRuleSetting",
        field: "rules",
      },
    ],
    event: [
      {
        type: "input",
        describe: "输入值时",
      },
      {
        type: "change",
        describe: "值修改时",
      },
      {
        type: "focus",
        describe: "获取焦点时",
      },
      {
        type: "blur",
        describe: "失去焦点时",
      },
      {
        type: "clear",
        describe: "点击清空按钮时",
      },
    ],
    action: [
      {
        type: "focus",
        describe: "使 input 获取焦点",
      },
      {
        type: "blur",
        describe: "使 input 失去焦点",
      },
      {
        type: "clear",
        describe: "清除 input 值",
      },
      {
        type: "select",
        describe: "选中 input 中的文字",
      },
    ],
  },
};

export default Input;
