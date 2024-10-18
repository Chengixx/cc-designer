import { IElementBaseSetting } from "@cgx-designer/utils";

const Divider: IElementBaseSetting = {
  key: "divider",
  icon: "divider",
  label: "分割线",
  render: () => import("./Divider"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "divider",
      props: {
        placeHolder: "我是分割线😊",
        size: "",
      },
    };
  },
};

export default Divider;
