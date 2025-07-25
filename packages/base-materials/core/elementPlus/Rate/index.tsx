import { IElementBaseSetting } from "@cgx-designer/types";
import { RateIcon } from "@cgx-designer/icons";

const Rate: IElementBaseSetting = {
  key: "rate",
  icon: RateIcon,
  label: "评分",
  group: "表单组件",
  render: () => import("./Rate"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      formItem: true,
      key: "rate",
      field: "rate-" + id,
      props: { size: "", label: "rate" },
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
        key: "rate",
        field: "props.defaultValue",
        props: {
          placeholder: "请输入字段名",
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
        label: "只读",
        key: "switch",
        field: "props.disabled",
      },
      {
        label: "半选",
        key: "switch",
        field: "props.allowHalf",
      },
      {
        label: "可清空",
        key: "switch",
        field: "props.clearable",
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

export default Rate;
