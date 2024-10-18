import { IElementBaseSetting } from "@cgx-designer/utils";

const Card: IElementBaseSetting = {
  key: "card",
  icon: "card",
  label: "卡片",
  render: () => import("./Card"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "card",
      props: {
        label: "卡片标题",
      },
      elementList: [],
    };
  },
};

export default Card;
