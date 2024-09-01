import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElSwitch } from "element-plus";

const Switch: IElementBaseSetting = {
  key: "switch",
  icon: "switch",
  label: "开关",
  render: () => import("./Switch"),
  preview: () => <ElSwitch />,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "switch",
      focus: false,
      props: {
        label: "switch",
        size: "",
        defaultValue: false,
        labelPosition: "",
      },
    };
  },
};

export default Switch;
