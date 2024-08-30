import { IElementBaseSetting } from "@/config/elementCreator";
import { IEditorElement } from "@/store/modules/element";
import { ElRow, ElCol } from "element-plus";
import Col from "../Col";

const Row: IElementBaseSetting = {
  key: "row",
  icon: "row",
  label: "栅格",
  render: () => import("./Row"),
  preview: () => (
    <ElRow class="w-80 h-10">
      <ElCol span={12}>
        <div class="border-dashed border border-blue-200 h-full" />
      </ElCol>
      <ElCol span={12}>
        <div class="border-dashed border border-blue-200 h-full" />
      </ElCol>
    </ElRow>
  ),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      focus: false,
      key: "row",
      props: {},
      cols: [
        {
          id: uuid(),
          focus: false,
          key: "col",
          props: {
            span: 12,
          },
          elementList: [],
        },
        {
          id: uuid(),
          focus: false,
          key: "col",
          props: {
            span: 12,
          },
          elementList: [],
        },
      ],
    };
  },
};

export default Row;
