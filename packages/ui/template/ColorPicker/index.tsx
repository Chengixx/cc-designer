import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElColorPicker } from "element-plus";

const ColorPicker: IElementBaseSetting = {
  key: "colorPicker",
  icon: "colorPicker",
  label: "颜色选择器",
  render: () => import("./ColorPicker"),
  preview: () => <ElColorPicker />,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "colorPicker",
      props: {
        label: "colorPicker",
        size: "",
        defaultValue: "#409EFF",
        labelPosition: "",
      },
    };
  },
};

export default ColorPicker;
