import { IElementBaseSetting } from "@cgx-designer/types";

const SelectPanel: IElementBaseSetting = {
  key: "selectPanel",
  label: "对话框面板",
  noPushList: true,
  render: () => import("./SelectPanel"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "selectPanel",
    };
  },
};

export default SelectPanel;
