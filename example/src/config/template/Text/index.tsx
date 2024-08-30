import { IElementBaseSetting } from "@/config/elementCreator";

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
      focus: false,
      props: { color: "#000000", size: "", label: "something..." },
    };
  },
};

export default Text;
