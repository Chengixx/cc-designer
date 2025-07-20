import { IElementBaseSetting } from "@cgx-designer/controller";
import { TabIcon } from "@cgx-designer/icons";

const Tab: IElementBaseSetting = {
  key: "tab",
  icon: TabIcon,
  label: "标签页",
  group: "容器组件",
  render: () => import("./Tab"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "tab",
      container: true,
      props: {
        activeName: "tab1",
      },
      elementList: [
        {
          id: uuid(),
          key: "tabPane",
          props: {
            label: "标签页1",
            name: "tab1",
          },
          elementList: [],
        },
        {
          id: uuid(),
          key: "tabPane",
          props: {
            label: "标签页2",
            name: "tab2",
          },
          elementList: [],
        },
      ],
    };
  },
  config: {
    attribute: [
      {
        label: "是否撑开",
        key: "switch",
        field: "props.stretch",
      },
      {
        label: "标签类型",
        key: "select",
        field: "props.type",
        props: {
          label: "select",
          multiple: false,
          options: [
            { label: "默认", value: "default" },
            { label: "卡片", value: "card" },
            { label: "边框卡片", value: "border-card" },
          ],
          placeholder: "请选择标签类型",
        },
      },
      {
        key: "tabList",
        field: "elementList",
      },
    ],
  },
};

export default Tab;
