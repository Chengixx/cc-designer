import { describe, it, expect } from "vitest";
import { createRef } from "../index";

describe("Ref 类", () => {
  it("应该使用初始值创建实例", () => {
    const ref = createRef(1);
    expect(ref.value).toBe(1);
  });
});
