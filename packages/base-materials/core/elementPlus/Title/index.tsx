import { IElementBaseSetting } from "@cgx-designer/types";
import { TextIcon } from "@cgx-designer/icons";

const Title: IElementBaseSetting = {
  key: "title",
  icon: TextIcon,
  label: "标题",
  group: "基础组件",
  render: () => import("./Title"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "title",
      props: { color: "#000000", size: "", label: "something..." },
    };
  },
  config: {
    attribute: [
      {
        label: "文本",
        key: "input",
        field: "props.label",
        props: {
          placeholder: "请输入",
          size: "default",
        },
      },
      {
        label: "颜色",
        key: "colorPicker",
        field: "props.color",
      },
    ],
  },
};

export default Title;
