import { createSourceCode, html, style } from "../index";
import { describe, it, expect } from "vitest";
import * as data from "../data";

//Todo
describe("测试创建生成代码", () => {
  it("测试创建代码", async () => {
    const builderSchema = data.builderSchema;
    const { createHTML, createScript, createStyleSheet } =
      createSourceCode(builderSchema);

    expect(createHTML()).toBe(html);
    expect(createStyleSheet()).toBe(style);
    const script = await createScript();
    console.log(script, 1);
  });
});
