import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElInput } from "element-plus";

const Textarea: IElementBaseSetting = {
  key: "textarea",
  icon: "textarea",
  label: "文本域",
  render: () => import("./Textarea"),
  preview: () => <ElInput type="textarea" />,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "textarea",
      focus: false,
      props: {
        label: "textarea",
        placeHolder: "placeHolder",
        size: "",
        defaultValue: "",
      },
    };
  },
};

export default Textarea;
