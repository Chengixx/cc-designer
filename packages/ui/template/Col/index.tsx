import { IElementBaseSetting } from "@cgx-designer/utils";

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
};

export default Col;
