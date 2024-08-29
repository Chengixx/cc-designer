import { ElCol } from "element-plus";
import { IElementBaseSetting } from "@/config/elementCreator";

const Col: IElementBaseSetting = {
  key: "col",
  label: "布局",
  noPushList: true,
  render: () => import("./Col"),
  preview: () => (
    <ElCol span={12} class="border-dashed border border-blue-200"></ElCol>
  ),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "col",
      focus: false,
      props: {
        span: 12,
      },
      elementList: [],
    };
  },
};

export default Col;
