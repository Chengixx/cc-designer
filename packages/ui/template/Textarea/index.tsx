import { IElementBaseSetting } from "@cgx-designer/utils";

const Textarea: IElementBaseSetting = {
  key: "textarea",
  icon: "textarea",
  label: "文本域",
  render: () => import("./Textarea"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "textarea",
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
