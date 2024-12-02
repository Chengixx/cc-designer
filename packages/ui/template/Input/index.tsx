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
      props: {
        label: "input",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
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
        label: "密码",
        key: "switch",
        field: "props.show-password",
      },
      {
        key: "ruleSetting",
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
