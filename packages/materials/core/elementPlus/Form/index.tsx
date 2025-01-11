import { IElementBaseSetting } from "@cgx-designer/controller";

const Form: IElementBaseSetting = {
  key: "form",
  label: "表单",
  noPushList: true,
  render: async () => (await import("element-plus")).ElForm,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "form",
    };
  },
};

export default Form;
