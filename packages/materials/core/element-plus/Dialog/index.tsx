import { IElementBaseSetting } from "@cgx-designer/controller";

const Dialog: IElementBaseSetting = {
  key: "dialog",
  label: "对话框",
  render: async () => (await import("element-plus")).ElDialog,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "dialog",
    };
  },
};

export default Dialog;
