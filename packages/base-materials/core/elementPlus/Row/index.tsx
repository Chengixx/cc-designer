import { IElementBaseSetting } from "@cgx-designer/types";
import { RowIcon } from "@cgx-designer/icons";

const Row: IElementBaseSetting = {
  key: "row",
  icon: RowIcon,
  label: "栅格",
  group: "容器组件",
  render: () => import("./Row"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "row",
      props: {},
      elementList: [
        {
          id: uuid(),
          key: "col",
          props: {
            span: 12,
          },
          elementList: [],
        },
        {
          id: uuid(),
          key: "col",
          props: {
            span: 12,
          },
          elementList: [],
        },
      ],
    };
  },
  config: {
    attribute: [
      {
        key: "colList",
        field: "elementList",
      },
    ],
  },
};

export default Row;
