import { createSourceCode } from "../index";
import { describe, it, expect } from "vitest";
import * as testData from "./helper/data";
import * as data from "../data";

//Todo
describe("测试创建生成代码", () => {
  it("测试创建代码", () => {
    const builderSchema = testData.builderSchema;
    const { createHTML, createScript, createStyleSheet } =
      createSourceCode(builderSchema);

    expect(createHTML()).toBe(data.defaultHtml);
    expect(createStyleSheet()).toBe(data.defaultCSS);
    const script = createScript();
    console.log(script, 1);
  });
});
