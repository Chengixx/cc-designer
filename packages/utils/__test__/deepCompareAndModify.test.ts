import { describe, it, expect } from "vitest";
import { deepCompareAndModify } from "../common/util";

describe("deepCompareAndModify 函数测试", () => {
  it("测试基本对象的修改", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ b: 3, c: 4 });
  });

  it("测试嵌套对象的修改", () => {
    const obj1 = { a: { b: 1, c: 2 }, d: 3 };
    const obj2 = { a: { b: 2 }, e: 5 };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ a: { b: 2 }, e: 5 });
  });

  it("测试数组和对象的处理", () => {
    const obj1 = { a: [1, 2, 3], b: { c: 4 } };
    const obj2 = { a: { d: 5 }, b: { c: 6, e: 7 } };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ a: { d: 5 }, b: { c: 6, e: 7 } });
  });

  it("测试删除多余属性", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1 };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ a: 1 });
  });

  it("测试删除选项为 false 时不删除多余属性", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1 };
    deepCompareAndModify(obj1, obj2, false);

    expect(obj1).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("测试深层嵌套删除", () => {
    const obj1 = { a: { b: { c: 1 } }, d: 2 };
    const obj2 = { a: { b: {} } };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ a: { b: {} } });
  });

  it("测试空对象处理", () => {
    const obj1 = {};
    const obj2 = { a: 1 };
    deepCompareAndModify(obj1, obj2);

    expect(obj1).toEqual({ a: 1 });
  });
});
