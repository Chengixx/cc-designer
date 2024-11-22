import { IElementBaseSetting } from "@cgx-designer/utils";
import { ButtonIcon } from "@cgx-designer/icons";

const Button: IElementBaseSetting = {
  key: "button",
  icon: ButtonIcon,
  label: "按钮",
  render: () => import("./Button"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "button",
      props: { type: "primary", size: "", label: "button" },
    };
  },
  config: {
    attribute: [
      {
        label: "标题",
        key: "input",
        field: "props.label",
        props: {
          label: "标题",
          placeholder: "请输入标题",
          size: "default",
        },
      },
      {
        label: "类型",
        key: "select",
        field: "props.type",
        props: {
          label: "select",
          multiple: false,
          options: [
            { label: "主要", value: "primary" },
            { label: "成功", value: "success" },
            { label: "提醒", value: "warning" },
            { label: "危险", value: "danger" },
            { label: "信息", value: "info" },
            { label: "文本", value: "text" },
            { label: "默认", value: "default" },
          ],
        },
      },
      {
        label: "大小",
        key: "select",
        field: "props.size",
        props: {
          label: "select",
          multiple: false,
          placeholder:"请选择大小",
          options: [
            { label: "大", value: "large" },
            { label: "中", value: "medium" },
            { label: "小", value: "small" },
          ],
        },
      },
      {
        label: "颜色",
        key: "colorPicker",
        field: "props.color",
      },
      {
        label: "禁用",
        key: "switch",
        field: "props.disabled",
      },
      {
        label: "圆形按钮",
        key: "switch",
        field: "props.circle",
      },
      {
        label: "文本按钮",
        key: "switch",
        field: "props.text",
      },
    ],
    event: [
      {
        type: "click",
        describe: "点击按钮时",
      },
      {
        type: "dblclick",
        describe: "双击按钮时",
      },
    ],
  },
};

export default Button;
