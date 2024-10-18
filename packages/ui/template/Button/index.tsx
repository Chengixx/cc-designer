import { IElementBaseSetting } from "@cgx-designer/utils";

const Button: IElementBaseSetting = {
  key: "button",
  icon: "button",
  label: "按钮",
  render: () => import("./Button"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "button",
      props: { type: "primary", size: "", label: "button" },
    };
  },
};

export default Button;
