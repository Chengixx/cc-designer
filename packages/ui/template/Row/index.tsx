import { IElementBaseSetting } from "@cgx-designer/utils";
import { ElRow, ElCol } from "element-plus";

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
      key: "row",
      props: {},
      cols: [
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
};

export default Row;
