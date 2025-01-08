import { IElementBaseSetting } from "@cgx-designer/controller";
import { SwitchIcon } from "@cgx-designer/icons";

const Switch: IElementBaseSetting = {
  key: "switch",
  icon: SwitchIcon,
  label: "开关",
  render: () => import("./Switch"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      field: "switch-" + id,
      key: "switch",
      formItem: true,
      noShowFormItem: true,
      props: {
        hideDetails: true,
        label: "switch",
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
        label: "默认值",
        key: "switch",
        field: "props.defaultValue",
      },
      {
        label: "on值",
        key: "input",
        field: "props.activeValue",
        props: {
          placeholder: "启用时候的值",
        },
      },
      {
        label: "off值",
        key: "input",
        field: "props.inactiveValue",
        props: {
          placeholder: "关闭时候的值",
        },
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
        describe: "开启或者关闭时触发",
      },
    ],
  },
};

export default Switch;
