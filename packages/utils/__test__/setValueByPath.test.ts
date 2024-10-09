import { describe, expect, it } from "vitest";
import { setValueByPath } from "../common";

describe("测试一下根据路径设置对象的值", () => {
  it("正常情况正常设置", () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };
    const newObj = setValueByPath(obj, "a.b.c", 2);
    expect(obj.a.b.c).toEqual(newObj.a.b.c);
  });

  it("路径不存在的时候应该要新的", () => {
    const obj = {};
    const newObj = setValueByPath(obj, "a.b.c", 2);
    expect(newObj.a.b.c).toEqual(2);
  });
});
