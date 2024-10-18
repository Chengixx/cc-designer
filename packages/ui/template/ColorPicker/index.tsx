import { IElementBaseSetting } from "@cgx-designer/utils";

const ColorPicker: IElementBaseSetting = {
  key: "colorPicker",
  icon: "colorPicker",
  label: "颜色选择器",
  render: () => import("./ColorPicker"),
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
