import { IElementBaseSetting } from "@cgx-designer/types";

const FormItem: IElementBaseSetting = {
  key: "formItem",
  label: "表单项",
  group: "容器组件",
  noPushList: true,
  render: async () => (await import("element-plus")).ElFormItem,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "formItem",
    };
  },
};

export default FormItem;
