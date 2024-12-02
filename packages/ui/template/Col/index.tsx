import { IElementBaseSetting } from "@cgx-designer/controller";

const Col: IElementBaseSetting = {
  key: "col",
  label: "布局",
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
