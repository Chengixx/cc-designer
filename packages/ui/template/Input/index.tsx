import { IElementBaseSetting } from "@cgx-designer/utils";

const Input: IElementBaseSetting = {
  key: "input",
  icon: "input",
  label: "输入框",
  render: () => import("./Input"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "input",
      props: {
        label: "input",
        placeHolder: "placeHolder",
        size: "",
        defaultValue: "",
        labelPosition: "",
      },
    };
  },
};

export default Input;
