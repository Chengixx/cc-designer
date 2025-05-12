import { describe, it } from "vitest";
import { ElementController } from "../core";
import { IElementBaseSetting } from "../core/elementController";

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

  it("应当可以注册异步组件或者方法组件", () => {
    const elementController = new ElementController();
    const fnComponent = () => <div>fnComponent</div>;
    const asyncComponent = () => import("element-plus");
    elementController.registerElementRenderMap("fn", fnComponent);
    elementController.registerElementRenderMap("async", asyncComponent);
  });
});
