import { IElementBaseSetting } from "@cgx-designer/types";
import { ColorPickerIcon } from "@cgx-designer/icons";

const ColorPicker: IElementBaseSetting = {
  key: "colorPicker",
  icon: ColorPickerIcon,
  label: "颜色选择器",
  render: () => import("./ColorPicker"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      field: "colorPicker-" + id,
      formItem: true,
      noShowFormItem: true,
      key: "colorPicker",
      props: {
        defaultValue: "#409EFF",
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
        label: "默认值",
        key: "colorPicker",
        field: "props.defaultValue",
      },
      {
        label: "大小",
        key: "select",
        field: "props.size",
        props: {
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
        label: "透明度",
        key: "switch",
        field: "props.showAlpha",
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
        describe: "修改颜色时",
      },
    ],
  },
};

export default ColorPicker;
