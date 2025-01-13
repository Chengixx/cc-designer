import { IElementBaseSetting } from "@cgx-designer/controller";
import { RowIcon } from "@cgx-designer/icons";

const Col: IElementBaseSetting = {
  key: "col",
  label: "列",
  icon: RowIcon,
  noPushList: true,
  render: () => import("./Col"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "col",
      props: {
        span: 12,
      },
      elementList: [],
    };
  },
  config: {
    attribute: [
      {
        label: "列数",
        key: "inputNumber",
        field: "props.span",
      },
    ],
  },
};

export default Col;
