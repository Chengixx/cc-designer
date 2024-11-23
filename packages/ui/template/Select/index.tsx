import { IElementBaseSetting } from "@cgx-designer/utils";
import { SelectIcon } from "@cgx-designer/icons";

const Select: IElementBaseSetting = {
  key: "select",
  icon: SelectIcon,
  label: "选择器",
  render: () => import("./Select"),
  template: (uuid: Function) => {
    const id = uuid();
    return {
      id,
      key: "select",
      formItem: true,
      field: "select-" + id,
      props: {
        label: "select",
        multiple: false,
        options: [
          { label: "label1", value: "value1" },
          { label: "label2", value: "value2" },
        ],
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
        key: "select",
        field: "props.defaultValue",
      },
      {
        label: "占位符",
        key: "input",
        field: "props.placeholder",
        props: {
          defaultValue: "请选择",
        },
      },
      {
        label: "多选",
        key: "switch",
        field: "props.multiple",
        onChange: ({ value, values }: any) => {
          if (value) {
            values.props.defaultValue = [];
          } else {
            values.props.defaultValue = null;
          }
        },
      },
      {
        label: "合并多选",
        key: "switch",
        field: "props.collapseTags",
        show: ({ values }: any) => {
          return values.props.multiple;
        },
      },
      {
        label: "多选提示",
        key: "switch",
        field: "props.collapseTagsTooltip",
        show: ({ values }: any) => {
          return values.props.collapseTags;
        },
      },
      {
        label: "多选标签",
        key: "select",
        props: {
          placeholder: "请选择标签类型",
          options: [
            {
              label: "success",
              value: "success",
            },
            {
              label: "info",
              value: "info",
            },
            {
              label: "warning",
              value: "warning",
            },
            {
              label: "danger",
              value: "danger",
            },
          ],
        },
        show: ({ values }: any) => {
          return values.props.multiple;
        },
        field: "props.tagType",
      },
      {
        label: "大小",
        key: "select",
        field: "props.size",
        props: {
          label: "select",
          placeholder: "请选择大小",
          multiple: false,
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
        key: "selectOption",
        field: "props.options",
      },
      {
        key: "ruleSetting",
        field: "rules",
      },
    ],
    event: [
      {
        type: "change",
        describe: "选项变化时触发",
      },
    ],
  },
};

export default Select;
