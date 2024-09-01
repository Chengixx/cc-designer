import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElDivider } from "element-plus";

const Divider: IElementBaseSetting = {
  key: "divider",
  icon: "divider",
  label: "分割线",
  render: () => import("./Divider"),
  preview: () => <ElDivider><span class="font-thin text-xs">分割线</span></ElDivider>,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "divider",
      focus: false,
      props: {
        placeHolder: "我是分割线😊",
        size: "",
      },
    };
  },
};

export default Divider;
