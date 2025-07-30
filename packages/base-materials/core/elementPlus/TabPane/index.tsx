import { TabIcon } from "@cgx-designer/icons";
import { IElementBaseSetting } from "@cgx-designer/types";

const TabPane: IElementBaseSetting = {
  key: "tabPane",
  icon: TabIcon,
  label: "标签页面",
  noPushList: true,
  group: "容器组件",
  render: () => import("./TabPane"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "tabPane",
      props: {
        label: "标签页2",
        name: "tab2",
      },
      elementList: [],
    };
  },
  config: {
    attribute: [
      {
        label: "绑定值",
        key: "input",
        field: "props.name",
        props: {
          placeholder: "请输入值",
        },
      },
      {
        label: "名称",
        key: "input",
        field: "props.label",
        props: {
          placeholder: "请输入值",
        },
      },
    ],
  },
};

export default TabPane;
