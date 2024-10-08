import { ElCard } from "element-plus";
import { IElementBaseSetting } from "@cgx-designer/utils";

const Card: IElementBaseSetting = {
  key: "card",
  icon: "card",
  label: "卡片",
  render: () => import("./Card"),
  preview: () => (
    <ElCard class="w-full">
      {{
        header: () => {
          return <div>title</div>;
        },
        default: () => {
          return <div class="min-h-[42px]">content</div>;
        },
      }}
    </ElCard>
  ),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "card",
      props: {
        label: "卡片标题",
      },
      elementList: [],
    };
  },
};

export default Card;
