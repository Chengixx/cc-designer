import { IElementBaseSetting } from "@cgx-designer/controller";

const Dialog: IElementBaseSetting = {
  key: "dialog",
  label: "对话框",
  noPushList:true,
  render: () => import("./Dialog"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "dialog",
    };
  },
};

export default Dialog;
