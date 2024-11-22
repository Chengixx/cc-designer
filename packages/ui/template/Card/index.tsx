import { IElementBaseSetting } from "@cgx-designer/utils";
import { CardIcon } from "@cgx-designer/icons";

const Card: IElementBaseSetting = {
  key: "card",
  icon: CardIcon,
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
  config: {
    attribute: [
      {
        label: "标题",
        key: "input",
        field: "props.label",
        props: {
          label: "标题",
          placeholder: "请输入标题",
          size: "default",
        },
      },
      {
        label: "阴影",
        key: "select",
        field: "props.shadow",
        props: {
          label: "select",
          multiple: false,
          placeholder:"请选择阴影模式",
          options: [
            { label: "总是", value: "always" },
            { label: "触碰", value: "hover" },
            { label: "从不", value: "never" },
          ],
        },
      },
    ],
  },
};

export default Card;
