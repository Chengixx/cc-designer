import { IElementBaseSetting } from "@cgx-designer/utils";

const Text: IElementBaseSetting = {
  key: "text",
  icon: "text",
  label: "文本",
  render: () => import("./Text"),
  preview: () => <div class="h-fit w-fit">something...</div>,
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "text",
      props: { color: "#000000", size: "", label: "something..." },
    };
  },
};

export default Text;
