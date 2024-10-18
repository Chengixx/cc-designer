import { IElementBaseSetting } from "@cgx-designer/utils";

const Switch: IElementBaseSetting = {
  key: "switch",
  icon: "switch",
  label: "开关",
  render: () => import("./Switch"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "switch",
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
