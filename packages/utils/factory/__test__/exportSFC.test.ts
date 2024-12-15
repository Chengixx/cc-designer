import { createSFCSourceCode } from "../index";
import { describe, it, expect } from "vitest";
import * as testData from "./helper/data";
import * as data from "../data";

//Todo
describe("测试创建生成代码", () => {
  it("测试创建formItem代码", () => {
    const builderSchema = testData.builderSchema;
    const {} = createSFCSourceCode(builderSchema);
  });
});
