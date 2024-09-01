import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElButton } from "element-plus";

const Button: IElementBaseSetting = {
  key: "button",
  icon: "button",
  label: "按钮",
  render: () => import("./Button"),
  preview: () => <ElButton>button</ElButton>,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "button",
      focus: false,
      props: { type: "primary", size: "", label: "button" },
    };
  },
};

export default Button;
