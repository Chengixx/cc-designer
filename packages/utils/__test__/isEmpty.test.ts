import { describe, it, expect } from "vitest";
import { isEmpty } from "../index";

describe("测试isEmpty", () => {
  // 测试值为 null 或 undefined 的情况
  it("应返回 true 对于 null 或 undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  // 测试空对象的情况
  it("应返回 true 对于空对象", () => {
    expect(isEmpty({})).toBe(true);
  });

  // 测试非空对象的情况
  it("应返回 false 对于非空对象", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
  });

  // 测试空数组的情况
  it("应返回 true 对于空数组", () => {
    expect(isEmpty([])).toBe(true);
  });

  // 测试非空数组的情况
  it("应返回 false 对于非空数组", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  // 测试空字符串的情况
  it("应返回 true 对于空字符串", () => {
    expect(isEmpty("")).toBe(true);
  });

  // 测试非空字符串的情况
  it("应返回 false 对于非空字符串", () => {
    expect(isEmpty("Hello")).toBe(false);
  });

  // 测试空 Set 的情况
  it("应返回 true 对于空 Set", () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  // 测试非空 Set 的情况
  it("应返回 false 对于非空 Set", () => {
    expect(isEmpty(new Set([1, 2]))).toBe(false);
  });

  // 测试空 Map 的情况
  it("应返回 true 对于空 Map", () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  // 测试非空 Map 的情况
  it("应返回 false 对于非空 Map", () => {
    expect(isEmpty(new Map([["key", "value"]]))).toBe(false);
  });

  // 测试数字和布尔值的情况
  it("应返回 false 对于数字和布尔值", () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  // 测试类数组对象的情况
  it("应返回 false 对于类数组对象（如 arguments）", () => {
    function test(...args: any[]) {
      expect(isEmpty(args)).toBe(false);
    }
    test(1, 2, 3);
  });
});
