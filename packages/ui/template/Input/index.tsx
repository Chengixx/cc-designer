import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElInput } from "element-plus";

const Input: IElementBaseSetting = {
  key: "input",
  icon: "input",
  label: "输入框",
  render: () => import("./Input"),
  preview: () => <ElInput />,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "input",
      focus: false,
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
