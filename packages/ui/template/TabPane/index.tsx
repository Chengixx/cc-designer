import { IElementBaseSetting } from "@cgx-designer/controller";

const TabPane: IElementBaseSetting = {
  key: "tabPane",
  label: "标签页面",
  noPushList: true,
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
    attribute:[
      {
        label: "绑定值",
        key: "input",
        field: "props.name",
        props: {
          placeholder: "请输入值"
        }
      },
      {
        label: "名称",
        key: "input",
        field: "props.label",
        props: {
          placeholder: "请输入值"
        }
      },
    ]
  },
};

export default TabPane;
