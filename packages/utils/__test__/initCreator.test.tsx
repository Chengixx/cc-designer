import { describe, it } from "vitest";
import { ElementController } from "../core";
import { IElementBaseSetting } from "../types";

describe("测试注册组件", () => {
  it("注册一个", () => {
    //拿按钮的作为测试用例
    const mockTemplate: IElementBaseSetting = {
      key: "button",
      icon: "button",
      label: "按钮",
      render: () => <button>button</button>,
      preview: () => <button>button</button>,
      template: (uuid: Function) => {
        return {
          id: uuid(),
          key: "button",
          props: { type: "primary", size: "", label: "button" },
        };
      },
    };
    const elementController = new ElementController();
    elementController.register(mockTemplate);
  });
});
