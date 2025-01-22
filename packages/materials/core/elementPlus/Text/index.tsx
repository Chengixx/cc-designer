import { IElementBaseSetting } from "@cgx-designer/controller";
import { TextIcon } from "@cgx-designer/icons";

const Text: IElementBaseSetting = {
  key: "text",
  icon: TextIcon,
  label: "文本",
  render: () => import("./Text"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "text",
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

export default Text;
