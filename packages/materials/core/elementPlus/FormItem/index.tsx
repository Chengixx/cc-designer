import { IElementBaseSetting } from "@cgx-designer/controller";

const FormItem: IElementBaseSetting = {
  key: "formItem",
  label: "表单项",
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
