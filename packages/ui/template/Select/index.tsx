import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElSelect } from "element-plus";

export interface GroupOption {
  label: string;
  value: any;
}

const Select: IElementBaseSetting = {
  key: "select",
  icon: "select",
  label: "选择器",
  render: () => import("./Select"),
  preview: () => <ElSelect />,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "select",
      props: {
        label: "select",
        defaultValue: "",
        multiple: false,
        options: [
          { label: "label1", value: "1" },
          { label: "label2", value: "2" },
        ],
      },
    };
  },
};

export default Select;
