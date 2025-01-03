import { IElementBaseSetting } from "@cgx-designer/controller";
import { TextareaIcon } from "@cgx-designer/icons";

const Textarea: IElementBaseSetting = {
  key: "textarea",
  icon: TextareaIcon,
  label: "文本域",
  render: () => import("./Textarea"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      field: "textarea-" + id,
      key: "textarea",
      formItem: true,
      props: {
        label: "textarea",
        placeholder: "请输入",
        size: "",
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
          placeholder: "请输入字段名"
        }
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
      },
      {
        label: "默认值",
        key: "textarea",
        field: "props.defaultValue",
      },
      {
        label: "自适应",
        key: "switch",
        field: "props.autosize",
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
        type: "input",
        describe: "输入值",
      },
      {
        type: "change",
        describe: "值修改",
      },
      {
        type: "focus",
        describe: "获取焦点",
      },
      {
        type: "blur",
        describe: "失去焦点",
      },
    ],
    action: [
      {
        type: "focus",
        describe: "使 textarea 获取焦点",
      },
      {
        type: "blur",
        describe: "使 textarea 失去焦点",
      },
      {
        type: "clear",
        describe: "清除 textarea 值",
      },
      {
        type: "select",
        describe: "选中 textarea 中的文字",
      },
    ],
  },
};

export default Textarea;
