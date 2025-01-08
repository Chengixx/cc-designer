import { IElementBaseSetting } from "@cgx-designer/controller";
import { DividerIcon } from "@cgx-designer/icons";

const Divider: IElementBaseSetting = {
  key: "divider",
  icon: DividerIcon,
  label: "分割线",
  render: () => import("./Divider"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "divider",
      props: {
        placeholder: "我是分割线😊",
        size: "",
      },
    };
  },
  config: {
    attribute: [
      {
        label: "占位符",
        key: "input",
        field: "props.placeholder",
        props: {
          placeholder: "请输入占位符",
        },
      },
      {
        label: "占位位置",
        key: "select",
        field: "props.contentPosition",
        props: {
          multiple: false,
          options: [
            { label: "左", value: "left" },
            { label: "中", value: "center" },
            { label: "右", value: "right" },
          ],
          defaultValue: "center",
        },
      },
      {
        label: "线样式",
        key: "select",
        field: "props.borderStyle",
        props: {
          multiple: false,
          options: [
            { label: "none", value: "none" },
            { label: "hidden", value: "hidden" },
            { label: "dotted", value: "dotted" },
            { label: "dashed", value: "dashed" },
            { label: "solid", value: "solid" },
            { label: "double", value: "double" },
            { label: "groove", value: "groove" },
            { label: "ridge", value: "ridge" },
            { label: "inset", value: "inset" },
            { label: "outset", value: "outset" },
          ],
          defaultValue: "solid",
        },
      },
    ],
  },
};

export default Divider;
