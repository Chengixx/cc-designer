import { describe, expect, it } from "vitest";
import { createEmptyObj } from "../index";

describe("清除对象，转换一个全是空字符串值的对象", () => {
  it("传入一个空对象，应该能成功处理", () => {
    const obj = {};
    const result = createEmptyObj(obj);
    expect(result).toEqual({});
  });
  it("传入一个对象，应该成功转换", () => {
    const obj = {
      a: "a1",
      b: 0,
      c: function () {},
      d: [],
      e: {
        f: 1,
        g: "a",
      },
    };
    const result = createEmptyObj(obj);
    expect(result).toEqual({
      a: null,
      b: null,
      c: null,
      d: null,
      e: { f: null, g: null },
    });
  });
});
