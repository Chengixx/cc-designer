import { IElementBaseSetting } from "@cgx-designer/controller";
import { InputNumberIcon } from "@cgx-designer/icons";

const InputNumber: IElementBaseSetting = {
  key: "inputNumber",
  icon: InputNumberIcon,
  label: "数字输入框",
  render: () => import("./InputNumber"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      field: "inputNumber-" + id,
      key: "inputNumber",
      formItem: true,
      props: {
        label: "inputNumber",
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
        key: "inputNumber",
        field: "props.defaultValue",
        props: {
          placeholder: "请输入",
          size: "default",
          defaultValue: 1,
        },
      },
      {
        label: "步进",
        key: "inputNumber",
        field: "props.step",
        props: {
          defaultValue: 1,
        },
      },
      {
        label: "严格步进",
        key: "switch",
        field: "props.stepStrictly",
      },
      {
        label: "最大值",
        key: "inputNumber",
        field: "props.max",
        props: {
          placeholder: "请输入",
        },
      },
      {
        label: "最小值",
        key: "inputNumber",
        field: "props.min",
        props: {
          placeholder: "请输入",
        },
      },
      {
        label: "精度",
        key: "inputNumber",
        field: "props.precision",
        props: {
          placeholder: "请输入",
          min: 0,
        },
      },
      {
        label: "按钮位置",
        key: "select",
        defaultValue: "",
        props: {
          options: [
            {
              label: "default",
              value: "",
            },
            {
              label: "right",
              value: "right",
            },
          ],
          placeholder: "请选择",
          clearable: true,
        },
        field: "props.controlsPosition",
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
            { label: "中", value: "default" },
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
        key: "ruleSetting",
        field: "rules",
      },
    ],
    event: [
      {
        type: "change",
        describe: "值变化时",
      },
    ],
  },
};

export default InputNumber;
