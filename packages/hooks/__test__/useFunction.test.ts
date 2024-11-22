import { useFunction } from "../src/useFunction";
import { useElement } from "../src/useElement";
import { describe, it, expect, vi } from "vitest";

//!注意 这个很难用实际来演示 请用vitest好好测一下
describe("useFunction", () => {
  it("注册函数测试", () => {
    const elementManage = useElement();
    const functionManage = useFunction(elementManage);
    const javaScript = `
      function lcc (){
          return 'lccGo'
      }

      this.inject({
        lcc
      })
    `;
    functionManage.createFunction(javaScript);
    console.log(functionManage.functionsList.value, "查看");
    expect(functionManage.functionsList.value.lcc()).toEqual("lccGo");
  });
});
